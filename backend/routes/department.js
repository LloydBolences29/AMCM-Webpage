const express = require("express");
const router = express.Router();
const { connectToDatabase } = require("../lib/db");

router.get("/get-all-departments", async (req, res) => {
  try {
    const db = await connectToDatabase();
    // Fetch all departments
    const [departments] = await db.query(
      `SELECT departments.id AS ID,
                departments.name AS Name
         FROM departments`
    );
    res.status(200).json(departments);
  } catch (error) {
    console.error("Error fetching all departments:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/add-department", async (req, res) => {
    const { name } = req.body;
    
    if (!name) {
        return res.status(400).json({ message: "Department name is required" });
    }
    
    try {
        const db = await connectToDatabase();
        // Insert new department
        const [result] = await db.query(
        `INSERT INTO departments (name) VALUES (?)`,
        [name]
        );
    
        if (result.affectedRows > 0) {
        res.status(201).json({ message: "Department added successfully" });
        } else {
        res.status(500).json({ message: "Failed to add department" });
        }
    } catch (error) {
        console.error("Error adding department:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }

})

module.exports = router;
