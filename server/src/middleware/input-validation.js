import { body, validationResult } from "express-validator";

const validateUser = (type) => [
  body("email")
    .isEmail()
    .withMessage("Valid email is required.")
    .isLength({ min: 4, max: 32 })
    .withMessage("Email must be between 4 to 32 characters."),

  body("password")
    .notEmpty()
    .withMessage("Password is required.")
    .isLength({ min: 6 })
    .withMessage("Password must contain at least 6 characters.")
    .matches(/\d/)
    .withMessage("Password must contain at least one number."),

  ...(type === "register"
    ? [body("name").notEmpty().withMessage("Name is required.")]
    : []),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0].msg });
    }
    next();
  },
];

export const userRegisterValidation = validateUser("register");
export const userLoginValidation = validateUser("login");

export const validateRecipeRequest = [
  body("ingredients")
    .isArray({ min: 1 })
    .withMessage(
      "Ingredients are required and must be an array with at least one item."
    ),
  body("preferences")
    .optional()
    .isArray()
    .withMessage("Preferences must be an array."),
  body("cuisine")
    .optional()
    .isString()
    .withMessage("Cuisine must be a string."),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0].msg });
    }
    next();
  },
];
