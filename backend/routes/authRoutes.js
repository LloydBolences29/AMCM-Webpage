const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { connectToDatabase } = require('../lib/db');
const jwt = require('jsonwebtoken');



//importing middlewares
const authMiddleware = require('../middleware/auth');
const checkRole = require('../middleware/checkRole');

router.post('/register', authMiddleware, checkRole(['admin']), async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const connection = await connectToDatabase();
  //check if the user already exists
  const [existingUser] = await connection.query('SELECT * FROM userInfo WHERE email = ?', [email]);
  if (existingUser.length > 0) {
    return res.status(409).json({ error: 'User already exists' });
  }

  //hash the password
  const hashedPassword = await bcrypt.hash(password, 10);
  
  //insert the user into the database
  await connection.query('INSERT INTO userInfo (username, email, pass, role) VALUES (?, ?, ?, ?)', [username, email, hashedPassword, role]);

  res.status(201).json({ message: 'User registered successfully' });
    
  } catch (error) {
    console.log("Internal Server Error", error)
    return res.status(500).json({ error: "Error Saving user. Please check console." })
  }
  
});

//post routes for login
router.post('/login', async (req, res) => {

  try{
  const { email, password } = req.body;

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
        .json({ error: `Email doesn't exist in our records!! ` });
    }
  //check if the password is correct
  const user = existingUser[0][0];
  const isPasswordvalid = await bcrypt.compare(password, user.pass);
  if (!isPasswordvalid) {
    console.log('Invalid password');
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  //creation of token
  const token = jwt.sign({ username: user.username, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
  

  //set the token in the cookie
  res.cookie('token', token, {
    httpOnly: true,
    secure: false, 
    sameSite: 'Lax', 
    maxAge: 24 * 60 * 60 * 1000, 
    
  });

  res.status(200).json({ message: 'Login successful',
    user: {
      username: user.username,
      email: user.email,
      role: user.role
    }
   });

}catch (error) {
  console.error('Login error:', error);
  res.status(500).json({ error: 'Internal server error' });
}

});

//routes for auths
router.get('/auth', async (req, res) => {

  try {

    const token = req.cookies.token;
    console.log("Incoming cookies:", req.cookies);

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    //verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded JWT:", decoded);

    res.json({
      message: 'User is authenticated',
      user: {
        username: decoded.username,
        email: decoded.email,
        role: decoded.role
      }
    })
  } catch (error) {
    console.error('Auth error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//logout route
router.post('/logout', (req, res) => {
  // Clear the token cookie
  res.clearCookie('token', { httpOnly: true, secure: false, sameSite: 'Lax' });
  res.status(200).json({ message: 'Logout successful' });
});

module.exports = router;