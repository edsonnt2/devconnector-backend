const Profile = require("../models/Profile");
const { validationResult } = require("express-validator");

module.exports = Experience = {
  async store(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const {
      title,
      company,
      location,
      from,
      to,
      current,
      descripton
    } = req.body;
    const newExp = { title, company, location, from, to, current, descripton };

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.experience.unshift(newExp);

      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Ocorreu um erro no servidor !");
    }
  },
  async destroy(req, res) {
    try {
      const profile = await Profile.findOne({ user: req.user.id });

      // Pegar linha do Array
      const expIndex = profile.experience
        .map(item => item.id)
        .indexOf(req.params.id_exp);

      if (expIndex === -1)
        return res
          .status(400)
          .json({ msg: "Experiencia a ser deletada não encontrada !" });

      profile.experience.splice(expIndex, 1);

      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Ocorreu um erro no servidor !");
    }
  }
};
