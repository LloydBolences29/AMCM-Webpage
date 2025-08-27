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
    const {
      name,
      roomNo,
      localPhone,
      departmentId,

    } = req.body;

    // 1. Check if doctor with the same name already exists in that department
    const [existingDoctors] = await db.query(
      `SELECT d.id FROM doctors d
       JOIN doctor_department dd ON d.id = dd.doctor_id
       WHERE LOWER(d.name) = LOWER(?) AND dd.department_id = ?`,
      [name, departmentId]
    );

    if (existingDoctors.length > 0) {
      return res
        .status(409)
        .json({ message: "Doctor already exists in this department." });
    }

    // 2. Insert the new doctor into the database
    const [result] = await db.query(
      `INSERT INTO doctors (name, roomNo, localPhone) VALUES (?, ?, ?)`,
      [name, roomNo, localPhone]
    );

    const doctorId = result.insertId;

    // 3. Link doctor with department
    const [deptlinkResult] = await db.execute(
      `INSERT INTO doctor_department (doctor_id, department_id) VALUES (?, ?)`,
      [doctorId, departmentId]
    );

  
    

    res.status(201).json({ message: "Doctor added" });
  } catch (error) {
    console.error("Error adding doctor:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//add the schedule of the doctor
router.post("/add-schedule", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const {
      doctor_department_id,
      schedule_type,
      day_of_the_week,
      start_time,
      end_time,
      notes,
    } = req.body;

    //checking if the schedule is existing already
    const [existingSchedule] = await db.query(
      `SELECT doctor_schedules.id FROM doctor_schedules WHERE doctor_department_id = ? AND schedule_type = ? AND day_of_the_week = ? AND start_time = ? AND end_time = ?`,
      [
        doctor_department_id,
        schedule_type,
        day_of_the_week,
        start_time,
        end_time,
      ]
    );

    if (existingSchedule.length > 0) {
      return res.status(409).json({ message: "Schedule already exists." });
    }

    const [result] = await db.query(
      `INSERT INTO doctor_schedules (doctor_department_id, schedule_type, day_of_the_week, start_time, end_time, notes) VALUES (?, ?, ?, ?, ?, ?)`,
      [
        doctor_department_id,
        schedule_type,
        day_of_the_week,
        start_time,
        end_time,
        notes,
      ]
    );

    res.status(201).json({ message: "Schedule added successfully.", result });
  } catch (error) {
    console.error("Error Adding a new Schedule. ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//get all doctors with their department
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

//get all the doctors with their department as the user searches for the name of the doctor
router.get("/get-doctors-departments/:doctor", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const { doctor } = req.params;

    const [doctors] = await db.query(
      `SELECT 
      doctor_department.id AS "ID",
      doctors.name AS "name", 
      doctors.roomNo AS "room", 
      doctors.localPhone AS "phone", 
      departments.name AS "department" 
      FROM doctors 
      JOIN doctor_department ON doctors.id = doctor_department.doctor_id
      JOIN departments ON departments.id = doctor_department.department_id
      WHERE doctors.name LIKE ?;`,
      [`%${doctor}%`]
    );

    if (!doctors.length) {
      return res
        .status(404)
        .json({ message: "Unfortunately, there's no such doctor. :(" });
    }

    res.status(200).json(doctors);
  } catch (error) {
    console.log("Error fetching doctors by name:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//get all the doctors with the department according to the request department
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

//get all the doctors with their department assigned, schedule according to the request doctor name
// A helper function to format time (you can place this outside your route)
const formatTime = (timeValue) => {
  if (!timeValue) return null;
  // This logic assumes timeValue is a string like '15:00:00'
  const [hours, minutes] = timeValue.split(':');
  const h = parseInt(hours, 10);
  const m = `${minutes}`;
  const ampm = h >= 12 ? 'PM' : 'AM';
  const formattedHours = h % 12 || 12; // Converts 0 or 12 to 12
  return `${formattedHours}:${m} ${ampm}`;
};

router.get("/get-doctors/:doctor", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const { doctor } = req.params;

    // Step 1: Use a simple, robust SQL query to fetch raw data
    const sql = `
      SELECT 
        d.id,
        d.Name, 
        d.localPhone, 
        d.roomNo,
        dep.name AS department,
        ds.schedule_type,
        ds.day_of_the_week,
        ds.start_time,
        ds.end_time
      FROM 
        doctors d
      JOIN 
        doctor_department dd ON d.id = dd.doctor_id
      JOIN 
        departments dep ON dep.id = dd.department_id
      JOIN 
        doctor_schedules ds ON dd.id = ds.doctor_department_id
      WHERE 
        d.Name LIKE ? OR dep.name LIKE ?
      ORDER BY
        d.id,
        FIELD(ds.day_of_the_week, 'Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'),
        ds.start_time;
    `;

    const [rows] = await db.query(sql, [`%${doctor}%`, `%${doctor}%`]);

    if (!rows.length) {
      return res.status(404).json({ message: "Unfortunately, there's no such doctor. :(" });
    }

    // Step 2: Process the raw data into a clean JSON structure
    const doctorMap = {};
    rows.forEach(row => {
      // If we haven't seen this doctor yet, create their main entry
      if (!doctorMap[row.id]) {
        doctorMap[row.id] = {
          id: row.id,
          Name: row.Name,
          localPhone: row.localPhone,
          roomNumber: row.roomNo,
          department: row.department,
          schedules: {
            Clinic: [],
            Ultrasound: []
          }
        };
      }

      // Create a structured schedule object
      const scheduleObject = {
        day: row.day_of_the_week,
        time: `${formatTime(row.start_time)} - ${formatTime(row.end_time)}`
      };

      // Push the schedule into the correct category based on business logic
      
        if (row.schedule_type === 'ultrasound') {
          doctorMap[row.id].schedules.Ultrasound.push(scheduleObject);
        } else {
        doctorMap[row.id].schedules.Clinic.push(scheduleObject);
      } 
      
    });

    // Step 3: Send the clean, processed data
    const processedDoctors = Object.values(doctorMap);
    res.status(200).json(processedDoctors);

  } catch (error) {
    console.error("Error fetching doctor:", error);
    res.status(500).json({ message: "Internal Server Error" });
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
    res.status(200).json({
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
