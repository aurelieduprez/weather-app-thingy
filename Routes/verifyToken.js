const jwt = require("jsonwebtoken");

const TokenValidate = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("Accès refusé.");

  try {
    const verified = jwt.verify(token, process.env.TOKEN);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send("Accès refusé.");
  }
};

module.exports.TokenValidate = TokenValidate;
