const express = require("express");
const router = express.Router();

const { body } =
  require("express-validator");

const validate =
  require("../middleware/validationMiddleware");

const authMiddleware =
  require("../middleware/authMiddleware");

const {
  createTask,
  getTasks,
  updateTask,
  deleteTask
} = require("../controllers/taskController");

// Protected Routes

router.post(
  "/",
  authMiddleware,

  body("title")
    .notEmpty()
    .withMessage("Title is required"),

  body("priority")
    .optional()
    .isIn(["low", "medium", "high"])
    .withMessage("Invalid priority"),

  validate,

  createTask
);

router.get(
  "/",
  authMiddleware,
  getTasks
);

router.put(
  "/:id",

  authMiddleware,

  body("priority")
    .optional()
    .isIn(["low", "medium", "high"])
    .withMessage("Invalid priority"),

  validate,

  updateTask
);

router.delete(
  "/:id",
  authMiddleware,
  deleteTask
);

module.exports = router;
