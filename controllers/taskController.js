const Task = require("../models/Task");

// CREATE TASK
exports.createTask = async (req, res) => {
  try {

    const {
      title,
      description,
      dueDate,
      priority,
      status
    } = req.body;

    const task = await Task.create({
      title,
      description,
      dueDate,
      priority,
      status,
      userId: req.user.id
    });

    res.status(201).json(task);

  } catch (error) {

    res.status(500).json({
      message: "Error creating task",
      error: error.message
    });

  }
};

// GET ALL TASKS
exports.getTasks = async (req, res) => {
  try {

    const {
      status,
      priority,
      page = 1,
      limit = 10,
      sortBy = "createdAt",
      order = "DESC"
    } = req.query;

    const whereClause = {
      userId: req.user.id
    };

    if (status) {
      whereClause.status = status;
    }

    if (priority) {
      whereClause.priority = priority;
    }

    const offset =
      (page - 1) * limit;

    const tasks =
      await Task.findAll({

        where: whereClause,

        limit: parseInt(limit),

        offset: parseInt(offset),

        order: [[sortBy, order]]

      });

    res.json(tasks);

  } catch (error) {

    res.status(500).json({
      message: "Error fetching tasks"
    });

  }
};

// UPDATE TASK
exports.updateTask = async (req, res) => {
  try {

    const { id } = req.params;

    const task = await Task.findOne({
      where: {
        id,
        userId: req.user.id
      }
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    await task.update(req.body);

    res.json(task);

  } catch (error) {

    res.status(500).json({
      message: "Error updating task"
    });

  }
};

// DELETE TASK
exports.deleteTask = async (req, res) => {
  try {

    const { id } = req.params;

    const task = await Task.findOne({
      where: {
        id,
        userId: req.user.id
      }
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    await task.destroy();

    res.json({
      message: "Task deleted"
    });

  } catch (error) {

    res.status(500).json({
      message: "Error deleting task"
    });

  }
};
