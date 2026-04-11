const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    // ❌ No token
    if (!token) {
      return res.status(401).json({ msg: "No token, access denied" });
    }

    // ✅ Remove "Bearer "
    const actualToken = token.startsWith("Bearer ")
      ? token.split(" ")[1]
      : token;

    // ✅ Verify token
    const decoded = jwt.verify(actualToken, process.env.JWT_SECRET);

    // 🔥 IMPORTANT: attach admin id
    req.adminId = decoded.id;

    next();

  } catch (error) {
    console.log("AUTH ERROR:", error);
    res.status(401).json({ msg: "Invalid token" });
  }
};

module.exports = authMiddleware;