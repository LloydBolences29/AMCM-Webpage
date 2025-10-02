const express = require("express");
const router = express.Router();
const { connectToDatabase } = require("../lib/db");
const bcrypt = require('bcrypt');


//importing middlewares
const authMiddleware = require('../middleware/auth');
const checkRole = require('../middleware/checkRole');

router.get("/get-users", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const [users] = await db.query(
      `SELECT userInfo.id,
              userInfo.username,
              userInfo.email,
              userInfo.role
       FROM userInfo`
    );
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching all users:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.put("/edit-user", authMiddleware, checkRole(['admin']), async (req, res) =>{
  try {
    const { id, username, email, role, password } = req.body;

    if(!id || !username || !email || !role){
      return res.status(400).json({ message: "Missing required fields" });
    }

    const db = await connectToDatabase();

    // Check if the user exists
    const [existingUser] = await db.query("SELECT * FROM userInfo WHERE id = ?", [id]);
    if (existingUser.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

     //hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

    const sql = `UPDATE userInfor SET username = ?, email = ?, role = ? WHERE id = ?`;
    const values = [username, email, role, id];
    
    await db.query(sql, values);

    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.log("Error editing user: ", error)
    res.status(500).json({ message: "Internal Server Error" });
  }
})
module.exports = router;