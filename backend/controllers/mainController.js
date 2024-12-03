const db = require("../models/queries");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");

const validateSignup = [
  body("username")
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage("Username must be between 3 and 30 characters")
    .isAlphanumeric()
    .withMessage("Username must contain only letters and numbers"),

  body("password")
    .trim()
    .isLength({ min: 4 })
    .withMessage("Password must be at least 4 characters long"),

  body("confirm-password")
    .trim()
    .custom((value, { req }) => value === req.body.password)
    .withMessage("Passwords do not match"),
];

exports.getSignin = (req, res) => {
  res.json(req.body);
};

exports.getSignUp = (req, res) => {
  res.json(req.body);
};

exports.createUser = [
  validateSignup,
  async (req, res, next) => {
    const errors = validationResult(req);
    /*
    if (!errors.isEmpty()) {
      return res.status(500).json({ error: errors.array() });
    }
    Validation will be handled in the frontend with react so anything related to express-validator 
    is actually not needed, "arleady used username" will be done here since it isnt possible in the frontend
    */
    const { username, password } = req.body;
    const duplicate = await db.getUserByName(username);
    if (duplicate) {
      return res.status(409).json({ error: "DUPLICATE_USERNAME" });
    }

    bcrypt.hash(password, 10, async (err, hashedpassword) => {
      if (err) {
        return next(err);
      }
      await db.createUser(username, hashedpassword);
      res.redirect("/");
    });
  },
];
