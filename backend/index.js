require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const path = require("path");
const rateLimit = require("express-rate-limit");

const authRoutes = require("./routes/authRoutes.js"); // Adjust the path as necessary
const doctorRoutes = require("./routes/doctorRoutes.js"); // Adjust the path as necessary
const departmentRoutes = require("./routes/department.js"); // Adjust the path as necessary
const keywordRoutes = require("./routes/keywordRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const pageRoutes = require("./routes/pageRoutes.js");

const helmet = require("helmet");

// Use all helmet protections
app.use(helmet());

// Then customize CSP after it (optional but recommended)
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      "default-src": ["'self'"],
      "img-src": [
        "'self'",
        "data:",
        "http://195.68.4.254",
        ,
        "https:"
      ],
      "script-src": ["'self'", "'nonce-<RANDOM_NONCE>'"],
      "connect-src": [
        "'self'",
        "http://195.68.4.254"
      ],
      "style-src": ["'self'", "'nonce-<RANDOM_NONCE>'"],
      "object-src": ["'none'"], // Disables plugins for added safety
      "base-uri": ["'self'"], // Prevents dangerous <base> changes
      "form-action": ["'self'"] // Restricts where forms can submit
    },
  })
);

app.disable("x-powered-by");

app.use(
  cors({
    origin: ["http://195.68.4.254", "http://195.68.4.254:3000"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true, // Allow credentials if needed
  })
);

app.options(/(.*)/, cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(express.json());

app.use(cookieParser());

// DEFINE LIMITERS (Keep the general limiter)
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 500, // INCREASED LIMIT: Use a more generous limit for general API traffic
  message: "Too many requests from this IP, please try again after 15 minutes",
});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again after 15 minutes",
});

//routes
app.use("/api/auth", limiter, authRoutes); //for logging and registering of users
app.use("/api/doctor", generalLimiter, doctorRoutes);
app.use("/api/department", generalLimiter, departmentRoutes);
app.use("/api/keyword", generalLimiter, keywordRoutes); //for adding keywords
app.use("/api/user", generalLimiter, userRoutes);
app.use("/api/page", generalLimiter, pageRoutes); //for adding news
app.use(
  "/api/uploads/pdfFile",
  cors({
    origin: ["http://195.68.4.254"],
  }),
  express.static(path.join(__dirname, "uploads", "pdfFile"), {
    setHeaders: (res) => {
      res.set("Cache-Control", "no-store");
      res.set("Cross-Origin-Resource-Policy", "cross-origin");
    },
  })
);

app.use(
  "/api/uploads/thumbnail",
  cors({
    origin: ["http://195.68.4.254"],
  }),
  express.static(path.join(__dirname, "uploads", "thumbnail"), {
    setHeaders: (res) => {
      res.set("Cache-Control", "no-store");
      res.set("Cross-Origin-Resource-Policy", "cross-origin");
    },
  })
);
const PORT = process.env.PORT;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});

