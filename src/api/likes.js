const Post = require("../models/Post");

module.exports = likes = {
  async like(req, res) {
    try {
      const post = await Post.findById(req.params.id);

      if (!post) return res.status(400).json({ msg: "Post não encontrado !" });

      if (
        post.likes.filter(like => like.user.toString() === req.user.id)
          .length === 0
      ) {
        post.likes.unshift({ user: req.user.id });
        if (
          post.unlikes.filter(unlike => unlike.user.toString() === req.user.id)
            .length > 0
        ) {
          const nounlike = post.unlikes
            .map(item => item.user.toString())
            .indexOf(req.user.id);
          post.unlikes.splice(nounlike, 1);
        }
      } else {
        const nolike = post.likes
          .map(item => item.user.toString())
          .indexOf(req.user.id);
        post.likes.splice(nolike, 1);
      }

      await post.save();
      res.json({ likes: post.likes, unlikes: post.unlikes });
    } catch (err) {
      console.error(err.message);
      if (err.kind === "ObjectId")
        return res.status(400).json({ msg: "Post não encontrado !" });

      res.status(500).send("Ocorreu um erro no servidor !");
    }
  },
  async unlike(req, res) {
    try {
      const post = await Post.findById(req.params.id);

      if (!post) return res.status(400).json({ msg: "Post não encontrado !" });

      if (
        post.unlikes.filter(unlike => unlike.user.toString() === req.user.id)
          .length === 0
      ) {
        post.unlikes.unshift({ user: req.user.id });
        if (
          post.likes.filter(like => like.user.toString() === req.user.id)
            .length > 0
        ) {
          const nolike = post.likes
            .map(item => item.user.toString())
            .indexOf(req.user.id);
          post.likes.splice(nolike, 1);
        }
      } else {
        const unlike = post.unlikes
          .map(item => item.user.toString())
          .indexOf(req.user.id);
        post.unlikes.splice(unlike, 1);
      }

      await post.save();
      res.json({ likes: post.likes, unlikes: post.unlikes });
    } catch (err) {
      console.error(err.message);
      if (err.kind === "ObjectId")
        return res.status(400).json({ msg: "Post não encontrado !" });

      res.status(500).send("Ocorreu um erro no servidor !");
    }
  }
};
