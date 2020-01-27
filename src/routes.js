const { Router } = require("express");
const router = Router();

const auth = require("./api/auth");
const users = require("./api/users");
const profile = require("./api/profile");
const experience = require("./api/experience");
const education = require("./api/education");
const github = require("./api/github");
const posts = require("./api/posts");
const likes = require("./api/likes");
const comments = require("./api/comments");
const Validator = require("./validator/validator");
const authToken = require("./middleware/auth");

// Caminho onde todas as rotas irão passar.

// api/users
router.post("/api/users", Validator.userStore, users.store);
router.get("/api/users", users.index);
// autenticando user e pegando o token
router.post("/api/auth", auth.show);
// api/auth
router.get("/api/auth", authToken, auth.authRequest);

// api/profile
router.post("/api/profile", [authToken, Validator.profileStore], profile.store);
router.get("/api/profile/me", authToken, profile.show);
router.get("/api/profile", profile.index);
router.get("/api/profile/user/:id", profile.showParam);
router.delete("/api/profile", authToken, profile.destroy);

// api/profile/experience
router.put(
  "/api/profile/experience",
  [authToken, Validator.experienceStore],
  experience.store
);
router.delete("/api/profile/experience/:id_exp", authToken, experience.destroy);

// api/profile/education
router.put(
  "/api/profile/education",
  [authToken, Validator.educationStore],
  education.store
);
router.delete("/api/profile/education/:id_edu", authToken, education.destroy);

// api/profile/github/:username
router.get("/api/profile/github/:username", github.show);

// api/posts
router.post("/api/posts", [authToken, Validator.postStore], posts.store);
router.get("/api/posts", authToken, posts.index);
router.get("/api/posts/:id", authToken, posts.show);
router.delete("/api/posts/:id", authToken, posts.destroy);

// api/posts/like/:id  api/posts/unlike/:id
router.put("/api/posts/like/:id", authToken, likes.like);
router.put("/api/posts/unlike/:id", authToken, likes.unlike);

// api/posts/comments/:id
router.put(
  "/api/posts/comments/:id",
  [authToken, Validator.postStore],
  comments.store
);
router.delete(
  "/api/posts/comments/:id/:comment_id",
  authToken,
  comments.destroy
);

module.exports = router;
