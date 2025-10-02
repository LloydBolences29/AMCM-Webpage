const jwt = require("jsonwebtoken");

module.exports = function authMiddleware(req, res, next) {
  // Try reading from Authorization header OR cookie
  const authHeader = req.headers.authorization?.split(" ")[1];
  const cookieToken = req.cookies.token; 
  const token = authHeader || cookieToken;

  if (!token) {
    return res.status(401).json({ message: "No token provided. Please Logged in first." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Please logged in first." });
  }
};
