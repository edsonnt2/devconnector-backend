const Profile = require("../models/Profile");
const config = require("config");
const request = require("request");

module.exports = Github = {
  async show(req, res) {
    try {
      const options = {
        uri: `http://api.github.com/users/${
          req.params.username
        }/repos?per_page=5&sort=created:asc&client_id=${config.get(
          "githubClientId"
        )}&client_secret=${config.get("githubSecret")}`,
        method: "GET",
        headers: { "user-agent": "node.js" }
      };
      request(options, (error, response, body) => {
        if (error) console.log(error);
        if (response.statusCode !== 200)
          return res
            .status(404)
            .json({ msg: "Nenhum perfil Github encontrado !" });

        res.json(JSON.parse(body));
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Ocorreu um erro no servidor !");
    }
  }
};
