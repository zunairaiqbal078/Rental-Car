const jwt = require("jsonwebtoken");

const verifyAuth = (req, res, next) => {
  console.log("User Verifying Token...");

  let token =
    req.cookies?.authToken || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: " Unauthorized: Token required." });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    console.log("✅ Decoded User:", decoded);

    req.user = decoded; // Attach user data (id, role, email, etc.)
    next();
  } catch (error) {
    console.error(" Token Verification Failed:", error);
    return res
      .status(401)
      .json({ message: " Invalid Token. Please login again." });
  }
};

module.exports = verifyAuth;
