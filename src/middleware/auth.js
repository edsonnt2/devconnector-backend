const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (req, res, next) => {
  // Pegar token do header
  const token = req.header("x-auth-token");

  // Verifica se tem token
  if (!token)
    return res.status(401).json({ msg: "Sem token, autorização negada !" });

  // Verifica o token
  try {
    const decodificado = jwt.verify(token, config.get("jwtSecrect"));

    req.user = decodificado.user;
    next();
  } catch (err) {
    console.error(err.message);
    res.status(401).json({ msg: "Token não é vádido !" });
  }
};
