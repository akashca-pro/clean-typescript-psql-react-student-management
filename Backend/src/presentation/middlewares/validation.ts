import { body } from "express-validator";

const baseValidation = [
  body("email")
    .trim()
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Invalid email format")
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).withMessage("Invalid email structure"),

  body("password")
    .trim()
    .notEmpty().withMessage("Password is required")
    .isLength({ min: 8, max: 50 }).withMessage("Password must be between 8 and 50 characters")
    .matches(/[A-Z]/).withMessage("Password must contain at least one uppercase letter")
    .matches(/[a-z]/).withMessage("Password must contain at least one lowercase letter")
    .matches(/[0-9]/).withMessage("Password must contain at least one digit")
    .matches(/[!@#$%^&*]/).withMessage("Password must contain at least one special character"),
];

export const validateSignup = [
  body("name")
    .trim()
    .notEmpty().withMessage("Name is required")
    .isLength({ min: 3, max: 50 }).withMessage("Name must be between 3 and 50 characters")
    .matches(/^[a-zA-Z\s]+$/).withMessage("Name must contain only letters"),
  ...baseValidation
];

export const validateLogin = [...baseValidation]