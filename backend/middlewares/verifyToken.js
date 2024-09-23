import jwt from "jsonwebtoken";

export default async function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({ error: "Token Is Needed" });
  }

  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : authHeader;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.locals.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ error: "Invalid Token" });
  }
}
