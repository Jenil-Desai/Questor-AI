import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : authHeader;
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Invalid token" });
      }
      console.log(decoded);
      if (decoded.userId) {
        req.userId = decoded.userId;
      } else {
        req.organisationId = decoded.organisationId;
        console.log(req.organisationId);
      }
      next();
    });
  } catch (err) {
    console.error("Authentication error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
