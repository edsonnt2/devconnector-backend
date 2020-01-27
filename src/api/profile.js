const Profile = require("../models/Profile");
const User = require("../models/User");
const Post = require("../models/Post");
const { validationResult } = require("express-validator");
const Fields = require("../validator/data_profile");

module.exports = profile = {
  async index(req, res) {
    try {
      const profiles = await Profile.find().populate("user", [
        "name",
        "avatar"
      ]);
      res.json(profiles);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Ocorreu um erro no servidor !");
    }
  },
  async showParam(req, res) {
    try {
      const profile = await Profile.findOne({
        user: req.params.id
      }).populate("user", ["name", "avatar"]);
      if (!profile)
        return res.status(400).json({ msg: "Perfil não encontrado !" });

      res.json(profile);
    } catch (err) {
      if (err.kind === "ObjectId")
        return res.status(400).json({ msg: "Perfil não encontrado !" });

      console.error(err.message);
      res.status(500).send("Ocorreu um erro no servidor !");
    }
  },
  async show(req, res) {
    try {
      const profile = await Profile.findOne({
        user: req.user.id
      }).populate("user", ["name", "avatar"]);
      if (!profile)
        return res.status(400).json({ msg: "Perfil não encontrado !" });

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Ocorreu um erro no servidor !");
    }
  },
  async store(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    // Criar objeto de perfil
    const profileFields = {};
    profileFields.user = req.user.id;
    Fields(req.body, profileFields);

    try {
      const user = await User.findById(req.user.id);
      if (!user)
        return res.status(400).json({ msg: "Usuário não encontrado !" });

      let profile = await Profile.findOne({ user: req.user.id });

      if (profile) {
        // Update
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );
      } else {
        // Create
        profile = new Profile(profileFields);
        await profile.save();
      }
      return res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Ocorreu um erro no servidor !");
    }
  },
  async destroy(req, res) {
    try {
      await Post.deleteMany({ user: req.user.id });
      await Profile.findOneAndRemove({ user: req.user.id });
      await User.findOneAndRemove({ _id: req.user.id });
      res.json({ msg: "Usuário deletado !" });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Ocorreu um erro no servidor !");
    }
  }
};
