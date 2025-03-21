const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  const token = req.headers["auth-token"];
  if (!token) {
    return res.status(403).json({
      success: false,
      msg: "Se requiere token para la autenticación",
      error_code: 1,
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_ACOUNT_ACTIVE);
    req.user = decoded;
  } catch (err) {
    return res.status(401).json({ success: false, msg: "La sesión expiró" });
  }
  return next();
};