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
      doctors.name AS Name, 
      doctors.roomNo AS Room Number, 
      doctors.localPhone AS "Local Phone" 
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

router.get("/get-all-doctors", async (req, res) => {
  try {
    const db = await connectToDatabase();

    // Fetch all doctors
    const [doctors] = await db.query(
      `SELECT 
      doctors.name AS "Name", 
      doctors.roomNo AS "Room Number", 
      doctors.localPhone AS "Local Phone" 
      FROM doctors`
    );
    res.status(200).json(doctors);
  } catch (error) {
    console.error("Error fetching all doctors:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/add-doctor", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const { name, roomNo, localPhone, departmentId } = req.body;

    // Insert the new doctor into the database
    const [result] = await db.query(
      `INSERT INTO doctors (name, roomNo, localPhone) VALUES (?, ?, ?)`,
      [name, roomNo, localPhone]
    );

    const doctorId = result.insertId;

    await db.execute(
      `INSERT INTO doctor_department (doctor_id, department_id) 
       VALUES (?, ?)`,
      [doctorId, departmentId]
    );
    res.status(201).json({ message: "Doctor added" });

  } catch (error) {
    console.error("Error adding doctor:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


router.get("/get-doctors-departments", async (req, res)=>{
try {
  const db = await connectToDatabase();
  // Fetch all doctors and their departments
  const [doctors] = await db.query(

    `SELECT 
      doctors.name AS "Name", 
      doctors.roomNo AS "Room Number", 
      doctors.localPhone AS "Local Phone", 
      departments.name AS "Department" 
      FROM doctors 
      JOIN doctor_department ON doctors.id = doctor_department.doctor_id
      JOIN departments ON departments.id = doctor_department.department_id;`
  );

  res.status(200).json(doctors);
} catch (error) {
    console.error("Error fetching doctors and its departments:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
  
})



module.exports = router;
