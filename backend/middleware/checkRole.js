// Middleware to check user roles for route protection
module.exports = function checkRole(allowedRoles = []) {
  return (req, res, next) => {
    try {
      // Make sure user data is attached to req (e.g., from JWT verification middleware)
      const user = req.user;

      if (!user) {
        return res.status(401).json({ message: "Unauthorized: No user found" });
      }

      if (!allowedRoles.includes(user.role)) {
        return res.status(403).json({ message: "Forbidden: Access denied" });
      }

      next(); // ✅ User is authorized
    } catch (error) {
      console.error("Role check error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
};