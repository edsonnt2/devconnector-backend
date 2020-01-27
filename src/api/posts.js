const Post = require("../models/Post");
const User = require("../models/User");
const { validationResult } = require("express-validator");

module.exports = posts = {
  async store(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    try {
      const user = await User.findById(req.user.id).select("-password");

      const newPost = new Post({
        user: req.user.id,
        text: req.body.text,
        name: user.name,
        avatar: user.avatar
      });

      await newPost.save();

      res.json(newPost);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Ocorreu um erro no servidor !");
    }
  },
  async index(req, res) {
    try {
      const post = await Post.find().sort({ date: -1 });
      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Ocorreu um erro no servidor !");
    }
  },
  async show(req, res) {
    try {
      const post = await Post.findById(req.params.id);
      if (!post) return res.status(404).json({ msg: "Post não encontrado !" });

      res.json(post);
    } catch (err) {
      console.error(err.message);
      if (err.kind === "ObjectId")
        return res.status(404).json({ msg: "Post não encontrado !" });

      res.status(500).send("Ocorreu um erro no servidor !");
    }
  },
  async destroy(req, res) {
    try {
      const post = await Post.findById(req.params.id);

      if (!post) return res.status(404).json({ msg: "Post não encontrado !" });

      if (post.user.toString() !== req.user.id)
        return res.status(404).json({ msg: "Usuário não autorizado !" });

      await post.remove();
      res.json({ msg: "Post deletado !" });
    } catch (err) {
      console.error(err.message);
      if (err.kind === "ObjectId")
        return res.status(404).json({ msg: "Post não encontrado !" });

      res.status(500).send("Ocorreu um erro no servidor !");
    }
  }
};
