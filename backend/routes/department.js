const express = require("express");
const router = express.Router();
const { connectToDatabase } = require("../lib/db");

//import all the middlewares
const authMiddleware = require("../middleware/auth");
const checkRole = require("../middleware/checkRole");
//get all the department with pagination
router.get("/get-all-departments", async (req, res) => {
  try {
    const db = await connectToDatabase();

    const page = parseInt(req.query.page || "1", 10);
    const limit = parseInt(req.query.limit || "10", 10);

    const offset = (page - 1) * limit;

    //count the rows
    const [countRows] = await db.query(
      `SELECT COUNT(*) as total FROM departments `
    );
    const totalRows = countRows[0].total;
    const totalPages = Math.ceil(totalRows / limit);

    const [departments] = await db.query(
      `SELECT * FROM departments ORDER BY id LIMIT ? OFFSET ?`,
      [limit, offset]
    );

    res.status(200).json({
      departments,
      pagination: {
        totalRows,
        totalPages,
        currentPage: page,
        itemsPerPage: limit,
      },
    });
  } catch (error) {
    console.error("Error fetching all departments:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//get all the department WITHOUT pagination
router.get("/get-departments",  async (req, res) => {
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

//search for a certain department
router.get("/search-department/:searchTerm", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const { searchTerm } = req.params;

    const [checkDepartment] = await db.query(
      `SELECT * FROM departments WHERE name LIKE ?`,
      [`%${searchTerm}%`]
    );

    if (checkDepartment.length === 0){
      return res.status(404).json({ message: "Department not found." });
    }

    const [department] = await db.query(
      `SELECT * FROM departments WHERE name LIKE ?`,
      [`%${searchTerm}%`]
    );
    res
      .status(200)
      .json({ message: "Department fetched successfully", department });
  } catch (error) {
    console.log("Error Fetching that department", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/add-department", authMiddleware, checkRole(["editor", "admin"]), async (req, res) => {
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
});

//Update an entry in the departments table in the database
router.put("/update-department/:id", authMiddleware, checkRole(["editor", "admin"]), async(req, res) =>{

  try {
    const db = await connectToDatabase();
    const { id } = req.params;
    const { name } = req.body;

    //check if the id is in the table
    const [checkID] = await db.query(`
      SELECT * FROM departments WHERE id = ?;
      `, [id])

    if (checkID.length === 0) {
      return res.status(404).json({ message: "Department not found" });
    }

    // Update the department
    await db.query(`
      UPDATE departments SET name = ? WHERE id = ?;
    `, [name, id]);

    return res.status(200).json({ message: "Department updated successfully" });
  } catch (error) {
    console.log("Error Updating your entry in the database.", error)
    return res.status(500).json({message: "Internal Server Error" });
  }
})

//deletion of the department in the database
router.delete("/delete-department/:id", authMiddleware, checkRole(["admin"]), async (req, res) =>{
try {
  const db = await connectToDatabase();

  const { id } = req.params;
  

  //checking if the ID is present
  const [checkId] = await db.query(`SELECT * FROM departments WHERE id = ?`, [id]);

  if (checkId.length === 0 ){
    return res.status(404).json({ message: "Department not found" });
  }

  //delete the department
  await db.query(`DELETE from departments WHERE id = ?`, [id]);

  res.status(200).json({message: "Department successfully deleted."})


  res.status(200).json({ message: "Department deleted successfully" });
} catch (error) {
  console.log("Error Deleting the department", error)
  res.status(500).json({message: "Internal Server Error" });
}
})

module.exports = router;
