const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = jwtSign = (user, res) => {
  const payload = {
    user: {
      id: user
    }
  };
  jwt.sign(
    payload,
    config.get("jwtSecrect"),
    {
      expiresIn: 60 * 60 * 100
    },
    (err, token) => {
      if (err) throw err;
      res.json({ token });
    }
  );
};
