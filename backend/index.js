require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const path = require("path");

const authRoutes = require("./routes/authRoutes.js"); // Adjust the path as necessary
const pageRoutes = require("./routes/pageRoutes.js"); // Adjust the path as necessary


app.use(
  cors({
    origin: ["http://195.68.4.254:3000", "http://localhost:3000"],
    credentials: true, // Allow credentials if needed
  })
);
app.use(express.json());


app.use(cookieParser());


//routes
app.use("/auth", authRoutes); //for logging and registering of users
app.use("/page", pageRoutes)

//for getting the path of the uploaded image
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
