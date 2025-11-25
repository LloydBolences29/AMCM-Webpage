const express = require("express");
const router = express.Router();
const { connectToDatabase } = require("../lib/db");

//import all the middlewares
const authMiddleware = require("../middleware/auth");
const checkRole = require("../middleware/checkRole");


router.get("/get-all-doctors", authMiddleware, checkRole(["admin", "editor"]), async (req, res) => {
  try {
    const db = await connectToDatabase();

    const page = parseInt(req.query.page || "1", 10);
    const limit = parseInt(req.query.limit || "10", 10);

    const offset = (page - 1) * limit;

    const [countRows] = await db.query(`SELECT COUNT(*) as total FROM doctors`);

    const totalRows = countRows[0].total;
    const totalPages = Math.ceil(totalRows / limit);


    // Fetch all doctors
    const [doctors] = await db.query(
      `SELECT 
      doctors.id,
      doctors.name, 
      doctors.roomNo, 
      doctors.localPhone
      FROM doctors
      ORDER BY id LIMIT ? OFFSET ?`, [limit, offset]
    );
    res.status(200).json({
      doctors, pagination: {
        totalRows,
        totalPages,
        currentPage: page,
        itemsPerPage: limit
      }
    });
  } catch (error) {
    console.error("Error fetching all doctors:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//Add doctors to the database
//endpoint for AddDoctor component
router.post("/add-doctor", authMiddleware, checkRole(["editor", "admin"]), async (req, res) => {
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
    console.log(doctorId)

    // 3. Link doctor with department
    await db.execute(
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
//endpoint for AddSchedule component
router.post("/add-schedule", authMiddleware, checkRole(["editor", "admin"]), async (req, res) => {
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

    console.log("To be sent: ", result)

    res.status(201).json({ message: "Schedule added successfully.", result });
  } catch (error) {
    console.error("Error Adding a new Schedule. ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//get all doctors with their department
//endpoint for AddKeyword component
router.get("/get-doctors-departments", authMiddleware, checkRole(["admin", "editor"]), async (req, res) => {
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
//endpoint for Add Schedule component
router.get("/get-doctors-departments/:doctor", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const { doctor } = req.params;

    const [doctors] = await db.query(
      `SELECT 
      doctor_department.id,
      doctors.name AS "name", 
      doctors.roomNo, 
      doctors.localPhone, 
      departments.name AS "department" 
      FROM doctors 
      LEFT JOIN doctor_department ON doctors.id = doctor_department.doctor_id
      LEFT JOIN departments ON departments.id = doctor_department.department_id
      WHERE doctors.name LIKE ?;`,
      [`%${doctor}%`]
    );

    if (doctors.length === 0) {
      return res
        .status(404)
        .json({ message: "Unfortunately, there's no such doctor or department. :(" });
    }

    res.status(200).json(doctors);
  } catch (error) {
    console.log("Error fetching doctors by name:", error);
    return res.status(500).json({ message: "Internal Server Error" });
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

//get all the doctors with their formatted schedules
//endpoint for fetchDoctor component
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
      return res.status(404).json({ message: "Unfortunately, there's no such doctor or department available. :(" });
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


//fetch all doctors with their department and formatted schedules
//endpoint for DoctorManagement component
router.get("/get-doctors-by-id/:id", authMiddleware, checkRole(["admin", "editor"]), async (req, res) => {
  try {
    const db = await connectToDatabase();
    const { id } = req.params;

    const sql = `
    SELECT 
      d.id,
      d.name, 
      d.localPhone, 
      d.roomNo,
      dep.id AS dep_id,
      dep.name AS department,
      ds.id AS schedule_id,
      ds.schedule_type,
      ds.day_of_the_week,
      ds.start_time,
      ds.end_time
    FROM 
      doctors d
    JOIN 
      doctor_department dd ON d.id = dd.doctor_id
    LEFT JOIN 
      departments dep ON dep.id = dd.department_id
    LEFT JOIN 
      doctor_schedules ds ON dd.id = ds.doctor_department_id
    WHERE 
      d.id = ?
  `;

    const [rows] = await db.query(sql, [id]);

    if (!rows.length) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const doctor = rows[0];
    const formattedDoctor = {
      id: doctor.id,
      name: doctor.name,
      localPhone: doctor.localPhone,
      schedule_id: doctor.schedule_id,
      roomNumber: doctor.roomNo,
      departmentId: doctor.dep_id,
      department: doctor.department,

      schedules: {
        Clinic: [],
        Ultrasound: []
      }
    };

    rows.forEach(row => {
      const scheduleObject = {
        day: row.day_of_the_week,
        time: `${formatTime(row.start_time)} - ${formatTime(row.end_time)}`,
        startTime: row.start_time,
        endTime: row.end_time
      };

      if (row.schedule_type === 'ultrasound') {
        formattedDoctor.schedules.Ultrasound.push(scheduleObject);
      } else {
        formattedDoctor.schedules.Clinic.push(scheduleObject);
      }
    });

    res.status(200).json(formattedDoctor);

  } catch (error) {
    console.log("Error fetching doctor by id:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
})

//update doctors information
//endpoint for DoctorManagement
router.put("/doctor-update-information/:id", authMiddleware, checkRole(["admin"]), async (req, res) => {
  try {
    const db = await connectToDatabase();
    const { id } = req.params;
    const { name, roomNo, localPhone, departmentId } = req.body;

    //check if that ID is present or not
    const [doctorIdCheck] = await db.query(`SELECT * FROM doctors WHERE id = ?`, [id])

    if (doctorIdCheck.length === 0) {
      return res.status(404).json({ message: "Doctor not found." })
    }

    await db.query(`
      UPDATE doctors
      SET name = ?, roomNo = ?, localPhone = ?
      WHERE id = ?
      `, [name, roomNo, localPhone, id])


    const departmentValue = departmentId || null
    await db.query(`
        UPDATE doctor_department
        SET department_id = ?

        WHERE doctor_id = ?
      `, [departmentValue, id])

    return res.status(200).json({ message: "Doctor's information successfully updated." })
  } catch (error) {
    console.log("Error updating doctor's information", error);
    return res.status(500).json({ message: "Error Updating your doctor's information. Please check you server's console. " })
  }
})

//another version of get-doctors endpoint to fetch the schedule ID along with other details
router.get("/get-doctors-with-all-details/:id", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const { id } = req.params;

    // Fetch all doctors with their details
    const [doctors] = await db.execute(`
      SELECT 
              d.id, d.name, d.localPhone, d.roomNo,
              dep.id AS dep_id, dep.name AS department,
              ds.id AS schedule_id, ds.schedule_type, ds.day_of_the_week, 
              ds.start_time, ds.end_time
            FROM doctors d
            JOIN doctor_department dd ON d.id = dd.doctor_id
            LEFT JOIN departments dep ON dep.id = dd.department_id
            LEFT JOIN doctor_schedules ds ON dd.id = ds.doctor_department_id
            WHERE d.id = ?`, [id]);

    // Process the raw data into a clean JSON structure
    const doctorsMap = new Map();

    for (const doctor of doctors) {
      if (!doctorsMap.has(doctor.id)) {
        doctorsMap.set(doctor.id, {
          id: doctor.id,
          name: doctor.name,
          localPhone: doctor.localPhone,
          roomNumber: doctor.roomNo,
          departmentId: doctor.dep_id,
          department: doctor.department,
          schedules: {
            clinic: [],
            ultrasound: []
          }
        });
      }

      const type = doctor.schedule_type;

      const doctorSchedules = doctorsMap.get(doctor.id).schedules;

      if (doctorSchedules[type]) {

        doctorSchedules[type].push({
          schedule_id: doctor.schedule_id,
          day_of_the_week: doctor.day_of_the_week,
          start_time: doctor.start_time.substring(0, 5),
          end_time: doctor.end_time.substring(0, 5)
        });
      }
    }

    const processedDoctors = Array.from(doctorsMap.values());

    return res.status(200).json({ doctors: processedDoctors })

  } catch (error) {
    console.log("Error fetching all doctors with their details:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
})


//delete the schedule of a doctor
router.delete("/delete-doctor-schedule/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const db = await connectToDatabase();

    console.log("Incoming id Params: ", req.params);

    const [result] = await db.execute(`SELECT * FROM doctor_schedules WHERE id = ?`, [id]);
    console.log("Result of the query", result[0])
    let entryId;
    if (result.length > 0) {
      const user = result[0];
      entryId = user.id
    } else {
      return res.status(404).json({ message: "Schedule not found for the specified doctor." });
    }


    const sql = "Delete From doctor_schedules where id = ?"
    const [request] = await db.query(sql, [id]);

    return res.status(200).json({ message: "Schedule successfully removed.", request });



  } catch (error) {
    console.log("There is an error when trying to delete the schedule of that doctor. Please check console for more details.", error);
    return res.status(500).json({ message: "Error encountered while deleting. Please check your server." });
  }
})







module.exports = router;
