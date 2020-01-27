const Profile = require("../models/Profile");
const { validationResult } = require("express-validator");

module.exports = Education = {
  async store(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const {
      school,
      degree,
      fieldOfStudy,
      from,
      to,
      current,
      descripton
    } = req.body;
    const newEdu = {
      school,
      degree,
      fieldOfStudy,
      from,
      to,
      current,
      descripton
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.education.unshift(newEdu);
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
      const eduIndex = profile.education
        .map(item => item.id)
        .indexOf(req.params.id_edu);

      if (eduIndex === -1)
        return res
          .status(400)
          .json({ msg: "Educação a ser deletada não encontrada !" });

      profile.education.splice(eduIndex, 1);

      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Ocorreu um erro no servidor !");
    }
  }
};
