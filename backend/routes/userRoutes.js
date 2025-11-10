const express = require("express");
const router = express.Router();
const { connectToDatabase } = require("../lib/db");
const bcrypt = require('bcrypt');


//importing middlewares
const authMiddleware = require('../middleware/auth');
const checkRole = require('../middleware/checkRole');

router.get("/get-users", authMiddleware, checkRole(["admin"]), async (req, res) => {
  try {
    const db = await connectToDatabase();
    const [users] = await db.query(
      `SELECT id,
              firstname,
              lastname,
              username,
              email,
              role,
              is_active,
              is_locked
       FROM userInfo`
    );
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching all users:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.put("/edit-user", authMiddleware, checkRole(["admin"]), async (req, res) => {
  try {
    const { id, ...fieldsToUpdate } = req.body; // extract id and rest of the fields

    if (!id) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // if no fields were provided, return early
    if (Object.keys(fieldsToUpdate).length === 0) {
      return res.status(400).json({ message: "No fields provided for update" });
    }

    const db = await connectToDatabase();

    // check if user exists
    const [userExists] = await db.query("SELECT * FROM userInfo WHERE id = ?", [id]);
    if (userExists.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    // build dynamic SQL query based on provided fields
    const setClause = Object.keys(fieldsToUpdate)
      .map((key) => `${key} = ?`)
      .join(", ");
    const values = [...Object.values(fieldsToUpdate), id];

    // SPECIAL CASE: if `is_locked` field is being updated
    if (fieldsToUpdate.hasOwnProperty("is_locked")) {
      const lockStatus = fieldsToUpdate.is_locked ? 1 : 0;
      const lockUntil = null;
      const failedAttempts = lockStatus === 1 ? 9 : 0; // if locking, mark attempts as 9

      const sql = `
    UPDATE userInfo 
    SET is_locked = ?, account_locked_until = ?, failed_attempts = ? 
    WHERE id = ?
  `;
      await db.query(sql, [lockStatus, lockUntil, failedAttempts, id]);

      return res.status(200).json({ message: "User lock status updated successfully" });
    }

    const sql = `UPDATE userInfo SET ${setClause} WHERE id = ?`;

    await db.query(sql, values);

    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.error("Error editing user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;