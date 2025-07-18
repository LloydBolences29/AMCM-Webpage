const express = require("express");
const router = express.Router();
const { connectToDatabase } = require("../lib/db");
const multer = require("multer");
// const upload = multer({ dest: "uploads/" }); // Set the destination for uploaded files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage });

//importing images using multer
router.post(
  "/upload-image",
  upload.single("backgroundImage"),
  async (req, res) => {
    try {
      const { file } = req;
      if (!file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      // Here you can save the file information to the database if needed
      const fileUrl = `${file.filename}`;
      res.status(200).json({ message: "Image uploaded successfully", success: true, file: fileUrl });
    } catch (error) {
      console.error("Error uploading image:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

//saving the page to the database
router.post("/save-page", async (req, res) => {
  const sections = req.body; // Array of sections (hero + information)

  try {
    const connection = await connectToDatabase();

    for (const section of sections) {
      const { id, section_type, content, backgroundColor, mediaPath, slug } = section;

      // Check if the section_type already exists
      const [rows] = await connection.query(
        "SELECT * FROM pages WHERE section_type = ?",
        [section_type]
      );

      if (rows.length > 0) {
        // Update existing section
        await connection.query(
          "UPDATE pages SET content = ?, mediaPath = ?, backgroundColor = ?, slug = ? WHERE section_type = ?",
          [content, mediaPath, backgroundColor, slug, section_type]
        );
      } else {
        // Insert new section
        await connection.query(
          "INSERT INTO pages (id, section_type, content, mediaPath, backgroundColor, slug) VALUES (?, ?, ?, ?, ?, ?)",
          [id, section_type, content, mediaPath, backgroundColor, slug]
        );
      }
    }

    console.log("Items to be posted:", sections);
    res.status(200).json({ message: "Page saved successfully!" });
  } catch (error) {
    console.error("Error saving page:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//get the page from the database
router.get("/get-all-sections", async (req, res) => {
  try {
    const connection = await connectToDatabase();
    const [rows] = await connection.query("SELECT * FROM pages");

    if (rows.length === 0) {
      return res.status(404).json({ error: "No sections found" });
    }

    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching sections:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
// Update the page in the database
router.put("/update-page/:slug", async (req, res) => {
  const { slug } = req.params;
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: "Title and content are required" });
  }
  try {
    const connection = await connectToDatabase();
    const [result] = await connection.query(
      "UPDATE pages SET title = ?, content = ? WHERE slug = ?",
      [title, content, slug]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Page not found" });
    }

    res.status(200).json({ message: "Page updated successfully" });
  } catch (error) {
    console.error("Error updating page:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//for deletion of the page
router.delete("/delete-page/:id", async (req, res) => {
  const { id } = req.params;

  console.log("Deleting page with ID:", id);

  try {
    const connection = await connectToDatabase();
    const [rows] = await connection.query("DELETE FROM pages WHERE id = ?", [
      id,
    ]);
    res.status(200).json({ message: "Page deleted successfully" });
  } catch (error) {
    console.error("Error deleting page:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
module.exports = router;
