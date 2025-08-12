const express = require("express");
const router = express.Router();
const { connectToDatabase } = require("../lib/db");

router.post("/add-keyword", async (req, res) => {
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
  availability.doctor_schedule as Schedule,
  GROUP_CONCAT(DISTINCT tags.tags SEPARATOR ', ') AS Tags
FROM doctors
JOIN doctor_department dd ON dd.doctor_id = doctors.id
JOIN departments dpt ON dd.department_id = dpt.id
JOIN keywords ON keywords.doctorDepartment_id = dd.id
JOIN tags ON keywords.keyword = tags.id
JOIN availability ON doctors.id = availability.doctor_id
WHERE tags.tags LIKE ? OR doctors.name LIKE ?
GROUP BY doctors.id`,
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
