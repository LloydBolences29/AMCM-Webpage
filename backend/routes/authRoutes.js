const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { connectToDatabase } = require('../lib/db');
const jwt = require('jsonwebtoken');



//importing middlewares
const authMiddleware = require('../middleware/auth');
const checkRole = require('../middleware/checkRole');

router.post('/register', authMiddleware, checkRole(['admin']), async (req, res) => {
  const { firstname, lastname, username, email, password, role } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const connection = await connectToDatabase();
    //check if the user already exists
    const [existingUser] = await connection.query('SELECT * FROM userInfo WHERE email = ?', [email]);
    if (existingUser.length > 0) {
      return res.status(409).json({ message: 'User already exists' });
    }

    //hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    //insert the user into the database
    await connection.query('INSERT INTO userInfo (firstname, lastname, username, email, pass, role, is_changed) VALUES (?, ?, ?, ?, ?, ?, ?)', [firstname, lastname, username, email, hashedPassword, role, 0]);

    res.status(201).json({ message: 'User registered successfully'});

  } catch (error) {
    console.log("Internal Server Error", error)
    return res.status(500).json({ error: "Error Saving user. Please check console." })
  }

});

//post routes for login
router.post('/login', async (req, res) => {
  const now = new Date();

  try {
    const { email, password } = req.body;
    const db = await connectToDatabase();

    //checking if the email and password are provided
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const existingUser = await connectToDatabase().then((db) =>
      db.query("SELECT * FROM userInfo WHERE email = ?", [email])
    );
    if (existingUser[0].length === 0) {

      return res
        .status(401)
        .json({ error: `Account doesn't exist in our records!! ` });
    }
    //check if the password is correct
    const user = existingUser[0][0];
    console.log('User retrieved from DB:', existingUser[0][0]);


    if (user.is_active === "inactive") {
      return res.status(403).json({ error: 'Account is inactive. Please contact admin.' });
    }

    if (user.is_locked) {
      return res.status(403).json({ error: 'Account is locked. Please contact Admin.' })
    }


    // Check if the current account is currently locked
    if (user.account_locked_until && new Date(user.account_locked_until) > now) {
      const remainingMs = new Date(user.account_locked_until) - now;
      const remainingSeconds = Math.ceil(remainingMs / 1000);
      return res.status(429).json({
        error: `Account locked. Try again in ${remainingSeconds} seconds.`,
      });
    }

    //check and reset failed attempts if last failed attempt was long ago
    const resetThresholdMs = 60 * 60 * 1000; // 1 hour
    if (!user.is_locked &&
      user.failed_attempts < 9 &&
      user.last_failed_at &&
      now - new Date(user.last_failed_at) > resetThresholdMs) {
      await db.query(`
        UPDATE userInfo
        SET failed_attempts = 0, last_failed_at = NULL
        WHERE id = ?
      `, [user.id]);
      user.failed_attempts = 0; // reset locally too
    }

    const isPasswordvalid = await bcrypt.compare(password, user.pass);
    if (!isPasswordvalid) {
      console.log('Invalid password');

      const failedAttempts = user.failed_attempts + 1;
      let accountLockedUntil = null;

      if (failedAttempts === 5) {
        accountLockedUntil = new Date(now.getTime() + 30 * 1000); // Lock account for 30 seconds
      }
      else if (failedAttempts === 8) {
        accountLockedUntil = new Date(now.getTime() + 1 * 60 * 1000); // Lock account for 1 minute
      }
      else if (failedAttempts >= 10) {

        await db.query(`UPDATE userInfo SET is_locked = ? WHERE id = ?`,
          [1, user.id]
        );

        return res.status(429).json({ message: 'Account permanently locked. Contact admin.' });
      }


      await db.query(`
                    UPDATE userInfo
                    SET failed_attempts = ?, account_locked_until = ?, last_failed_at = ?
                    WHERE id = ?`,
        [failedAttempts, accountLockedUntil, now, user.id]
      );

      let remainingAttempts = 0;

      if (failedAttempts <= 5) {
        remainingAttempts = 5 - failedAttempts;
      } else if (failedAttempts > 5) {
        remainingAttempts = 8 - failedAttempts;
      } else if (failedAttempts === 8) {
        remainingAttempts = 10 - failedAttempts;
      }
      console.log('User found:', user);

      return res.status(401).json({ message: "Incorrect password. Please try again.", remainingAttempts });

    }

    //reset failed attempts on successful login
    await db.query(`
                  UPDATE userInfo
                  SET failed_attempts = 0, account_locked_until = NULL, last_failed_at = NULL
                  WHERE id = ?`,
      [user.id]
    );



    const requirePasswordChange = (user.is_changed === 0);

    //creation of token
    const token = jwt.sign({ id: user.id, username: user.username, email: user.email, role: user.role, requirePasswordChange: requirePasswordChange }, process.env.JWT_SECRET, { expiresIn: '1h' });


    //set the token in the cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'Lax',
      maxAge: 24 * 60 * 60 * 1000,

    });



    return res.status(200).json({
      message: 'Login successful',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        requirePasswordChange: requirePasswordChange
      },
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }

});



//routes for auths
router.get('/auth', authMiddleware, async (req, res) => {

  try {

    const token = req.cookies.token;
    console.log("Incoming cookies:", req.cookies);

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    //verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded JWT:", decoded);



    return res.json({
      message: 'User is authenticated',
      user: {
        id: decoded.id,
        username: decoded.username,
        email: decoded.email,
        role: decoded.role,
        requirePasswordChange: decoded.requirePasswordChange
      },
    })
  } catch (error) {
    console.error('Auth error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/delete-user/:id', authMiddleware, checkRole(['admin']), async (req, res) => {
  try {
    const { id } = req.params
    const db = await connectToDatabase();


    //check if the user is existing
    const [existingUser] = await db.query('SELECT * FROM userInfo WHERE id = ?', [id]);
    if (existingUser.length === 0) {
      return res.status(404).json({ error: "User not found." })
    }


    const [sql] = await db.query('DELETE FROM userInfo WHERE id = ?', [id]);

    return res.status(200).json({ message: "User successfully removed.", sql })


  } catch (error) {
    console.log("Error removing the user.", error)
    return res.status(500).json({ error: "Error removing the user. Please check console." })
  }
})

//logout route
router.post('/logout', authMiddleware, async (req, res) => {
  // Clear the token cookie
  res.clearCookie('token', { httpOnly: true, secure: false, sameSite: 'Lax' });
  res.status(200).json({ message: 'Logout successful' });
});

//for changing the password
router.put('/change-password', authMiddleware, async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    const db = await connectToDatabase();

    //check the email
    const isExisting = await db.query('SELECT * FROM userInfo WHERE email = ?', [email]);
    if (isExisting[0].length === 0) {
      return res.status(404).json({ error: "Account doesn't exist in our records!! " })
    }

    //get the id of the email
    const userId = isExisting[0][0].id;

    //hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await db.query(`UPDATE userInfo SET pass = ?, is_changed = ? WHERE id = ?`, [hashedPassword, 1, userId]);

    return res.status(200).json({ message: "Password successfully changed. Please wait while we direct you to your page." })
  } catch (error) {
    console.log("Error changing password", error)
    return res.status(500).json({ error: "Error changing password. Please check console." })
  }
})

module.exports = router;