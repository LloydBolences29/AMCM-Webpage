const express = require("express");
const router = express.Router();
const { connectToDatabase } = require("../lib/db");
const multer = require("multer");
const path = require("path");

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
    const { name, roomNo, localPhone, departmentId, doctor_schedule } = req.body;

    // 1. Check if doctor with the same name already exists in that department
    const [existingDoctors] = await db.query(
      `SELECT d.id FROM doctors d
       JOIN doctor_department dd ON d.id = dd.doctor_id
       WHERE LOWER(d.name) = LOWER(?) AND dd.department_id = ?`,
      [name, departmentId]
    );

    if (existingDoctors.length > 0) {
      return res.status(409).json({ message: "Doctor already exists in this department." });
    }

    // 2. Insert the new doctor into the database
    const [result] = await db.query(
      `INSERT INTO doctors (name, roomNo, localPhone) VALUES (?, ?, ?)`,
      [name, roomNo, localPhone]
    );

    const doctorId = result.insertId;

    // 3. Link doctor with department
    await db.execute(
      `INSERT INTO doctor_department (doctor_id, department_id) VALUES (?, ?)`,
      [doctorId, departmentId]
    );

    // 4. Insert availability info
    await db.execute(
      `INSERT INTO availability (doctor_id, department_id, doctor_schedule) VALUES (?, ?, ?)`,
      [doctorId, departmentId, doctor_schedule]
    );

    res.status(201).json({ message: "Doctor added" });
  } catch (error) {
    console.error("Error adding doctor:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


router.get("/get-doctors-departments", async (req, res) => {
  try {
    const db = await connectToDatabase();
    // Fetch all doctors and their departments
    const [doctors] = await db.query(
      `SELECT 
      doctor_department.id AS "ID",
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
});

router.get("/get-doctors-by-department/:department", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const { department } = req.params;

    // Fetch doctors by department
    const [doctors] = await db.query(
      `SELECT 
      doctors.name AS "Name", 
      doctors.roomNo AS "Room Number", 
      doctors.localPhone AS "Local Phone",
      availability.doctor_schedule AS "Schedule"
      FROM doctors 
      JOIN doctor_department ON doctors.id = doctor_department.doctor_id
      JOIN departments ON departments.id = doctor_department.department_id
      JOIN availability on doctors.id = availability.doctor_id
      WHERE departments.name = ?;`,
      [department]
    );

    res.status(200).json(doctors);
  } catch (error) {
    console.error("Error fetching doctors by department:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/get-doctors/:doctor", async (req, res) => {
  try {
    const db = await connectToDatabase();

    const { doctor } = req.params;

    const [doctors] = await db.query(
      `SELECT 
      doctors.name AS "Name", 
      doctors.localPhone AS "Local Phone", 
      doctors.roomNo AS "Room Number",
      availability.doctor_schedule AS "Schedule",
      departments.name AS "Department"
      FROM doctors
      JOIN doctor_department ON doctors.id = doctor_department.doctor_id
      JOIN departments ON departments.id = doctor_department.department_id
      JOIN availability ON doctors.id = availability.doctor_id
      WHERE LOWER(doctors.name) LIKE LOWER(?) OR LOWER(departments.name) LIKE LOWER(?)`,[`%${doctor}%`,`%${doctor}%`]
    );

    if (!doctors.length) {
      return res
        .status(404)
        .json({ message: "Unfortunately, there's no such doctor. :(" });
    }

    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.error("Error fetching doctor:", error);
  }
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueName = file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

router.post("/upload-image", upload.single("file"), (req, res) => {
  try {
    const { file } = req;
    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Here you can save the file information to the database if needed
    const fileUrl = `${file.filename}`;
    res
      .status(200)
      .json({
        message: "Image uploaded successfully",
        success: true,
        file: fileUrl,
      });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
