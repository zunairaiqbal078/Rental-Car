const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authToken = req.headers["Authorization"];
  if (!authToken)
    return res
      .status(403)
      .json({ error: "Unauthorized, JWT Token is requried" });
  try {
    const decoded = jwt.verify(authToken, process.env.SECRET_KEY);
    req.user = decoded;
  } catch (error) {
    res.status(403).json({ error: "Invalid JWT Token" });
  }
};

module.exports = authenticateToken;
