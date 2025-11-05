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

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["application/pdf", "image/jpeg", "image/png", "image/svg+xml"];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only PDF, JPEG, and PNG are allowed."), false);
  }
};
const upload = multer({ storage, fileFilter, limits: { fileSize: 50 * 1024 * 1024 } });

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

  const [rows] = await db.query(`SELECT id, title, DATE_FORMAT(issued_date, '%Y-%m-%d') AS issued_date, original_filename, unique_filename, thumbnail, news_description, is_Active FROM upload_news`);
  res.status(200).json({message: "Successfully fetched from the database",rows});
} catch (error) {
  console.error ("Error fetching news:", error);
  res.status(500).json({ message: "Internal Server Error" });
}
})

router.get("/get-news-year", async (req, res) =>{
  try {
    const db = await connectToDatabase();

    const [rows] = await db.query("SELECT DISTINCT DATE_FORMAT(issued_date, '%Y') AS issued_year FROM upload_news WHERE is_Active = 'active' ORDER BY issued_year DESC");
    res.status(200).json({message: "Successfully fetched the year", rows});
  } catch (error) {
    console.log("Error Fetching the year.", error)
    res.status(500).json({ message: "Internal Server Error" });
  }
})

//filter by date
router.get("/filter-date", async (req, res) => {
  try {
    const { year, includeInactive } = req.query;
    const db = await connectToDatabase();

    let query = `
      SELECT id, title, DATE_FORMAT(issued_date, '%Y-%m-%d') AS issued_date,
             original_filename, unique_filename, thumbnail, news_description, is_Active
      FROM upload_news
      WHERE YEAR(issued_date) = ?
    `;

    if (!includeInactive) {
      query += " AND is_Active = 'active'";
    }

    const [rows] = await db.query(query, [year]);
    res.status(200).json({ message: "Successfully filtered the date", rows });
  } catch (error) {
    console.log("Error filtering date", error);
    res.status(500).json({ message: "Internal Server Error." });
  }
});



//updating the status of an entry in the news and update page.
router.put("/update-status", authMiddleware, checkRole(['admin', 'editor']), async (req, res) =>{
  try {
    const { id, is_Active } = req.body;
    
    if(!id || !is_Active){
      return res.status(400).json({ message: "Missing required fields" })
    }

    const db = await connectToDatabase();

    // Check if the news item exists
    const [existingNews] = await db.query("SELECT * FROM upload_news WHERE id = ?", [id]);
    if (existingNews.length === 0) {
      return res.status(404).json({ message: "News item not found" })
    }
    const sql = `UPDATE upload_news SET is_Active = ? WHERE id = ?`;
    const values = [is_Active, id];

    await db.query(sql, values);

    res.status(200).json({ message: "Status updated successfully" })
    
  } catch (error) {
    console.log("Error Updating status", error)
    return res.status(500).json({ message: "Internal Server Error" })
  }
})

router.put("/updated-news/:id", authMiddleware, checkRole(['admin', 'editor']), upload.fields([
  { name: "news-thumbnail", maxCount: 1 },
  { name: "news-file", maxCount: 1 },
]), async (req, res) => {
  try {
    const newsId = req.params.id;
    const { title, issued_date, news_description } = req.body;

    const pdfFile = req.files["news-file"] ? req.files["news-file"][0] : null;
    const thumbnailFile = req.files["news-thumbnail"]
      ? req.files["news-thumbnail"][0]
      : null;

    const db = await connectToDatabase();

    // Build the update query dynamically based on provided fields
    let sql = "UPDATE upload_news SET title = ?, issued_date = ?, news_description = ?";
    const values = [title, issued_date, news_description];

    if (pdfFile) {
      sql += ", original_filename = ?, unique_filename = ?";
      values.push(pdfFile.originalname, pdfFile.filename);
    }

    if (thumbnailFile) {
      sql += ", thumbnail = ?";
      values.push(thumbnailFile.filename);
    }

    sql += " WHERE id = ?";
    values.push(newsId);  

    await db.query(sql, values);

    res.status(200).json({ message: "News item updated successfully" });
  } catch (error) {
    console.log("Error updating news item", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//Delete news and Update
router.delete("/delete-news/:id", authMiddleware, checkRole(['admin', 'editor']), async (req, res) =>{
  try {
    const newsId = req.params.id;
    
    const db = await connectToDatabase();

    //checking if the news item exists in the db
    const [existingNews] = await db.query("SELECT * FROM upload_news WHERE id = ?", [newsId]);
    if (existingNews.length === 0) {
      return res.status(404).json({ message: "News item not found" })
    }

    const sql = `DELETE FROM upload_news WHERE id = ?`;
    await db.query(sql, [newsId]);

    return res.status(200).json({ message: "News item deleted successfully" })

  } catch (error){
    console.log("Error deleting the news item. Please check your console for more details.", error)
    return res.status(500).json({ message: "An internal Error has occured!!" })
  }
})

//post the news ID in the feature table
router.post("/add-featured-news", authMiddleware, checkRole(['admin', 'editor']), async (req, res) =>{
  try {
    const { newsIds } = req.body; // Expecting an array of news IDs
    console.log("Received news IDs for featured news:", newsIds);

    if (!Array.isArray(newsIds) || newsIds.length === 0) {
      return res.status(400).json({ message: "Please select one card to be featured." });
    }

    if(newsIds.length > 4){
      return res.status(400).json({ message: "You can only feature up to 4 news items." });
    }

    const db = await connectToDatabase();

    const [existingFeaturedNews]= await db.query("SELECT * FROM featuredNews")

    if(existingFeaturedNews.length > 0){
      // Clear existing featured news
      await db.query("DELETE FROM featuredNews")
    }

    //add the array of ids
    const values = newsIds.map(id => [id]);
    const sql = `INSERT INTO featuredNews (newsID) VALUES ?`;
    await db.query(sql, [values])

    //change the status of the news items to featured in the upload_news table
    const updateSql = `UPDATE upload_news SET is_Active = 'active' WHERE id IN (?)`;
    await db.query(updateSql, [newsIds]);
    
    
    return res.status(200).json({ message: "Successfully added all the featured news." })
  } catch (error) {
    console.log("Error adding all the featured news.", error)
    return res.status(500).json({ message: "Unexpected error happens, please check the server for more details." })
  }
})

//get all the featured news
router.get("/get-featured-news", async (req, res) => {
  try {
    const db = await connectToDatabase();

    const sql = `SELECT fn.id AS featureID, un.id AS newsID, un.title, DATE_FORMAT(un.issued_date, '%Y-%m-%d') AS issued_date, un.original_filename, un.unique_filename, un.thumbnail, un.news_description
                 FROM featuredNews fn
                 JOIN upload_news un ON fn.newsID = un.id`;

    const [rows] = await db.query(sql);

    return  res.status(200).json({ message: "Successfully fetched featured news.", rows })
  } catch (error) {
    console.log("Error fetching featured news. Please check your server console", error)
    return res.status(500).json({ message: "Internal Server Error" })
  }
})



module.exports = router;