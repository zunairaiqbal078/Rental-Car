const jwt = require("jsonwebtoken");

const verifyAdmin = (req, res, next) => {
  const token = req.cookies.authToken;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized access" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Access denied: Admins only" });
    }
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = verifyAdmin;
