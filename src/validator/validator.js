const { check } = require("express-validator");

const ValidatorUser = {
  userStore: [
    check("name", "O nome é obrigatório !")
      .not()
      .isEmpty()
      .trim()
      .escape(),
    check("email", "Por favor, coloque um e-mail válido !")
      .isEmail()
      .normalizeEmail(),
    check(
      "password",
      "Por favor, coloque uma senha com 6 ou mais caracteres !"
    ).isLength({ min: 6 })
  ],
  profileStore: [
    check("status", "O status é obrigatório !")
      .not()
      .isEmpty(),
    check("skills", "Habilidades são obrigatório !")
      .not()
      .isEmpty()
  ],
  experienceStore: [
    check("title", "Titulo é obrigatório !")
      .not()
      .isEmpty(),
    check("company", "Empresa é obrigatório !")
      .not()
      .isEmpty(),
    check("from", "A data que começou é obrigatório !")
      .not()
      .isEmpty()
  ],
  educationStore: [
    check("school", "Escola é obrigatório !")
      .not()
      .isEmpty(),
    check("degree", "O grâu de formação é obrigatório !")
      .not()
      .isEmpty(),
    check("fieldOfStudy", "Areas de estudo são obrigatório !")
      .not()
      .isEmpty(),
    check("from", "A data que começou é obrigatório !")
      .not()
      .isEmpty()
  ],
  postStore: [
    check("text", "Texto é obrigatório !")
      .not()
      .isEmpty()
  ]
};

module.exports = ValidatorUser;
