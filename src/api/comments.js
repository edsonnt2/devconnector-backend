const Post = require("../models/Post");
const User = require("../models/User");
const { validationResult } = require("express-validator");

module.exports = comments = {
  async store(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    try {
      const post = await Post.findById(req.params.id);

      if (!post) return res.status(400).json({ msg: "Post não encontrado !" });

      const user = await User.findById(req.user.id).select("-password");

      if (!user)
        return res.status(400).json({ msg: "Usuário não encontraodo !" });

      const newComment = {
        user: req.user.id,
        text: req.body.text,
        name: user.name,
        avatar: user.avatar
      };
      post.comments.unshift(newComment);

      await post.save();
      res.json(post.comments);
    } catch (err) {
      console.error(err.message);
      if (err.kind === "ObjectId")
        return res.status(400).json({ msg: "Post não encontrado !" });

      res.status(500).send("Ocorreu um erro no servidor !");
    }
  },
  async destroy(req, res) {
    try {
      const post = await Post.findById(req.params.id);

      if (!post) return res.status(400).json({ msg: "Post não encontrado !" });

      const comment = post.comments.find(
        comment => comment.id === req.params.comment_id
      );

      if (!comment)
        return res.status(400).json({ msg: "Comentário não encontrado !" });

      if (post.user.toString() !== req.user.id)
        if (comment.user.toString() !== req.user.id)
          return res.status(400).json({ msg: "Usuário não autorizado !" });

      const removeComment = post.comments
        .map(item => item.id)
        .indexOf(req.params.comment_id);
      post.comments.splice(removeComment, 1);
      await post.save();
      res.json(post.comments);
    } catch (err) {
      console.error(err.message);
      if (err.kind === "ObjectId")
        return res.status(400).json({ msg: "Post não encontrado !" });

      res.status(500).send("Ocorreu um erro no servidor !");
    }
  }
};
