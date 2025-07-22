const express = require("express");
const router = express.Router();
const { connectToDatabase } = require("../lib/db");

router.get("/get-doctors/:departments", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const { departments } = req.params;

    // Fetch doctors based on the provided department
    const [doctors] = await db.query(
      `SELECT 
      doctors.name, 
      doctors.roomNo, 
      doctors.localPhone 
      FROM doctors 
      JOIN doctor_departments ON doctors.id = doctor_departments.doctor_id
      JOIN departments ON doctor_departments.department_id = departments.id
       WHERE departments.name = ?`,
      [departments]
    );
    res.status(200).json(doctors);
  } catch (error) {
    console.error("Error fetching doctors:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
