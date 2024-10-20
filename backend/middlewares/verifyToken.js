import jwt from "jsonwebtoken";

export async function authMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({ error: "Token Is Needed" });
  }

  let token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : authHeader;
  token = token.slice(1, token.length - 1);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    res.locals.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ error: "Invalid Token" });
  }
}
