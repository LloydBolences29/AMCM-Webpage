const express = require("express");
const router = express.Router();
const { connectToDatabase } = require("../lib/db");


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
module.exports = router;