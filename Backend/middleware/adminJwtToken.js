const verifyAuth = require("./authJwtToken"); // Import verifyUser

const verifyAdmin = (req, res, next) => {
  verifyAuth(req, res, () => {
    console.log(" Checking Admin Role...");
    console.log("admin role", req.user);

    if (req.user.role !== "admin") {
      return res.status(403).json({ message: " Access Denied: Admins Only." });
    }

    console.log("✅ Admin Verified:", req.user);
    next();
  });
};

module.exports = verifyAdmin;
