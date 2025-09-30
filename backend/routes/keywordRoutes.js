const express = require("express");
const router = express.Router();
const { connectToDatabase } = require("../lib/db");

//import all the middlewares
const authMiddleware = require("../middleware/auth");
const checkRole = require("../middleware/checkRole");

router.post("/add-keyword", authMiddleware, checkRole(["editor", "admin"]), async (req, res) => {
  try {
    const db = await connectToDatabase();
    const { doctorDepartment_id, keyword } = req.body;

    // Insert the new keyword into the database
    const [result] = await db.query(`INSERT INTO tags (tags) VALUES (?)`, [
      keyword,
    ]);

    const keywordId = result.insertId;

    // Insert the relationships between the keyword and doctors
    for (const doctorId of doctorDepartment_id) {
      await db.execute(
        `INSERT INTO keywords (doctorDepartment_id, keyword) VALUES (?, ?)`,
        [doctorId, keywordId]
      );
    }

    res.status(201).json({ message: "Keyword added successfully" });
  } catch (error) {
    console.error("Error adding keyword:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//fetching all the keywwords
router.get("/get-keywords/:searchTerm", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const { searchTerm } = req.params;

    const [rows] = await db.query(
      `SELECT
  doctors.id AS ID,
  doctors.name AS Name,
  doctors.roomNo AS Room,
  doctors.localPhone AS Local,
  dpt.name AS Department,
  -- Column 1: Gathers schedules for ALL non-OB GYN doctors.
    GROUP_CONCAT(
        CASE 
            WHEN dpt.name NOT IN (
                "OB GYNE / PERINATOLOGIST / SONOLOGIST", 
                "OB GYNE / SONOLOGIST"
            ) THEN 
                CONCAT(
                    doctor_schedules.day_of_the_week, ' ', 
                    TIME_FORMAT(doctor_schedules.start_time, '%l:%i %p'), ' - ', 
                    TIME_FORMAT(doctor_schedules.end_time, '%l:%i %p')
                )
            ELSE NULL 
        END
                ORDER BY
            CASE doctor_schedules.day_of_the_week
                            WHEN 'Sun' THEN 7
                WHEN 'Mon' THEN 1
                WHEN 'Tue' THEN 2
                WHEN 'Wed' THEN 3
                WHEN 'Thur' THEN 4
                WHEN 'Fri' THEN 5
                WHEN 'Sat' THEN 6
            END, doctor_schedules.start_time
        SEPARATOR '\n'
    ) AS "General Schedule",

    GROUP_CONCAT(
        CASE 
            WHEN dpt.name IN (
                "OB GYNE / PERINATOLOGIST / SONOLOGIST", 
                "OB GYNE / SONOLOGIST"
            ) AND doctor_schedules.schedule_type = 'clinic' THEN 
                CONCAT(
                    doctor_schedules.day_of_the_week, ' ', 
                    TIME_FORMAT(doctor_schedules.start_time, '%l:%i %p'), ' - ', 
                    TIME_FORMAT(doctor_schedules.end_time, '%l:%i %p')
                )
            ELSE NULL 
        END
                ORDER BY
            CASE doctor_schedules.day_of_the_week
                            WHEN 'Sun' THEN 7
                WHEN 'Mon' THEN 1
                WHEN 'Tue' THEN 2
                WHEN 'Wed' THEN 3
                WHEN 'Thur' THEN 4
                WHEN 'Fri' THEN 5
                WHEN 'Sat' THEN 6
            END, doctor_schedules.start_time
        SEPARATOR '\n'
    ) AS "Clinic Schedule",

    GROUP_CONCAT(
        CASE 
            WHEN dpt.name IN (
                "OB GYNE / PERINATOLOGIST / SONOLOGIST", 
                "OB GYNE / SONOLOGIST"
            ) AND doctor_schedules.schedule_type = 'ultrasound' THEN 
                CONCAT(
                    doctor_schedules.day_of_the_week, ' ', 
                    TIME_FORMAT(doctor_schedules.start_time, '%l:%i %p'), ' - ', 
                    TIME_FORMAT(doctor_schedules.end_time, '%l:%i %p')
                )
            ELSE NULL 
        END
                ORDER BY
            CASE doctor_schedules.day_of_the_week
                WHEN 'Sun' THEN 7
                WHEN 'Mon' THEN 1
                WHEN 'Tue' THEN 2
                WHEN 'Wed' THEN 3
                WHEN 'Thur' THEN 4
                WHEN 'Fri' THEN 5
                WHEN 'Sat' THEN 6
            END, doctor_schedules.start_time
        SEPARATOR '\n'
    ) AS "Ultrasound Schedule"

FROM doctors
JOIN doctor_department dd ON dd.doctor_id = doctors.id
JOIN departments dpt ON dd.department_id = dpt.id
JOIN keywords ON keywords.doctorDepartment_id = dd.id
JOIN tags ON keywords.keyword = tags.id
JOIN doctor_schedules ON dd.id = doctor_schedules.doctor_department_id
WHERE tags.tags LIKE ? OR doctors.name LIKE ?
GROUP BY 
    doctors.id, doctors.name, doctors.localPhone, doctors.roomNo, dpt.name;`,
      [`%${searchTerm}%`, `%${searchTerm}%`]
    );

    if (!rows.length) {
      return res.status(404).json({
        message: "Unfortunately, we're still looking for a doctor for that. :(",
      });
    }

    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching keywords:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
