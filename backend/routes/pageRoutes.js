// /pageRoutes.js
const express = require("express");
const router = express.Router();
const { connectToDatabase } = require("../lib/db");
const multer = require("multer");
const path = require("path");

//import all the middlewares
const authMiddleware = require("../middleware/auth");
const checkRole = require("../middleware/checkRole");

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Check the name of the form field (news-file or news-thumbnail)
    if (file.fieldname === "news-file") {
      // Store PDF files here
      cb(null, path.join(__dirname, "..", "uploads", "pdfFile"));
    } else if (file.fieldname === "news-thumbnail") {
      // Store thumbnail files here
      cb(null, path.join(__dirname, "..", "uploads", "thumbnail"));
    } else {
      // Fallback for any other unexpected file field
      cb(new Error("Invalid file field name"), false);
    }
  },
  filename: (req, file, cb) => {
    // Multer automatically ensures unique filenames
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

router.post(
  "/upload-image",
  upload.fields([
    { name: "news-thumbnail", maxCount: 1 },
    { name: "news-file", maxCount: 1 },
  ]), authMiddleware, checkRole(["editor", "admin"]),
  async (req, res) => {
    try {
      const { title, issued_date, news_description } = req.body;

      const pdfFile = req.files["news-file"] ? req.files["news-file"][0] : null;
      const thumbnailFile = req.files["news-thumbnail"]
        ? req.files["news-thumbnail"][0]
        : null;

      // Check for required files first to prevent crashes
      if (!pdfFile || !thumbnailFile) {
        console.error("Missing files:", {
          pdf: !!pdfFile,
          thumbnail: !!thumbnailFile,
        });

        console.error("Data being sent", pdfFile, thumbnailFile, req.body);
        return res
          .status(400)
          .json({ message: "PDF file and thumbnail image are required." });
      }

      const originalPdfName = pdfFile.originalname;
      const uniquePdfName = pdfFile.filename;
      const uniqueThumbnailName = thumbnailFile.filename;

      console.log("📩 Incoming body:", req.body);
      console.log("📁 Uploaded files:", req.files);

      const db = await connectToDatabase();

      console.log("📦 Inserting into DB with values:", {
        title,
        issued_date,
        originalPdfName,
        uniquePdfName,
        uniqueThumbnailName,
        news_description,
      });

      const sql =`INSERT INTO upload_news (title, issued_date, original_filename, unique_filename, thumbnail, news_description) VALUES (?, ?, ?, ?, ?, ?)`;
      const values =  [
          title,
          issued_date,
          originalPdfName,
          uniquePdfName,
          uniqueThumbnailName,
          news_description,
        ]

      const [result] = await db.query(sql, values);

      res.status(200).json({ message: "Successfully added to the database.", result });
      console.log("✅ Insert success:", result);
    } catch (error) {
      console.error("Unexpected error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }

    
    console.log("📩 Incoming body after db query:", req.body);
    console.log("📁 Uploaded files after db query:", req.files);
  }
);

router.get("/get-news", async (req, res) => {
try {
  const db = await connectToDatabase();

  const [rows] = await db.query("SELECT title, DATE_FORMAT(issued_date, '%Y-%m-%d') AS issued_date, original_filename, unique_filename, thumbnail, news_description FROM upload_news");
  res.status(200).json({message: "Successfully fetched from the database",rows});
} catch (error) {
  console.error ("Error fetching news:", error);
  res.status(500).json({ message: "Internal Server Error" });
}
})

router.get("/get-news-year", async (req, res) =>{
  try {
    const db = await connectToDatabase();

    const [rows] = await db.query("SELECT DISTINCT DATE_FORMAT(issued_date, '%Y') AS issued_year FROM upload_news ORDER BY issued_year DESC");
    res.status(200).json({message: "Successfully fetched the year", rows});
  } catch (error) {
    console.log("Error Fetching the year.", error)
    res.status(500).json({ message: "Internal Server Error" });
  }
})

//filter by date
router.get("/filter-date", async (req, res) =>{
  try {
    const { year } = req.query;
    const db = await connectToDatabase();

    const [rows] = await db.query("SELECT id, title, DATE_FORMAT(issued_date, '%Y-%m-%d') AS issued_date, original_filename, unique_filename, thumbnail, news_description FROM upload_news WHERE YEAR(issued_date) = ?", [year]);

    res.status(200).json({message: "Successfully filtered the date", rows});
    
  } catch (error) {
    console.log("Error filtering date", error)
    res.status(500).json({ message: "Internal Server Error." })
  }
})

module.exports = router;
