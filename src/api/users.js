const { validationResult } = require("express-validator");
const User = require("../models/User");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwtSign = require("../middleware/jwt_sign");

module.exports = users = {
  // Registrar usuario
  async store(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { name, email, password } = req.body;

    try {
      // Ver se o usuário já existe
      let user = await User.findOne({ email });

      if (user)
        return res
          .status(400)
          .json({ errors: [{ msg: "Usuário já cadastrado !" }] });

      // Pegar o gravatar do user
      const avatar = gravatar.url(email, { s: 200, r: "pg", d: "mm" });

      user = new User({
        name,
        email,
        avatar,
        password
      });

      // Usar o encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();

      // retornar com jsonwebtoken
      jwtSign(user.id, res);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Ocorreu um erro no servidor !");
    }
  },
  async index(req, res) {
    try {
      const user = await User.find().select("-password");
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Ocorreu um erro no servidor !");
    }
  }
};
