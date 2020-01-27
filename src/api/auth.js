const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwtSign = require("../middleware/jwt_sign");

module.exports = users = {
  async authRequest(req, res) {
    try {
      const user = await User.findById(req.user.id).select("-password");
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Ocorreu um erro no servidor !");
    }
  },
  async show(req, res) {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user)
        return res
          .status(400)
          .json({ errors: [{ msg: "Credenciais inválidas !" }] });

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch)
        return res
          .status(400)
          .json({ errors: [{ msg: "Credenciais inválidas !" }] });
      // valida o user atual com jsonwebtoken

      jwtSign(user.id, res);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Ocorreu um erro no servidor !");
    }
  }
};
