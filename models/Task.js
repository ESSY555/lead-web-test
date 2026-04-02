const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const User = require("./User");

const Task = sequelize.define("Task", {

  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  description: {
    type: DataTypes.TEXT,
  },

  dueDate: {
    type: DataTypes.DATE,
  },

  priority: {
    type: DataTypes.ENUM(
      "low",
      "medium",
      "high"
    ),
    defaultValue: "medium",
  },

  status: {
    type: DataTypes.ENUM(
      "todo",
      "in-progress",
      "done"
    ),
    defaultValue: "todo",
  }

}, {
  timestamps: true,
});

// Relationship
User.hasMany(Task, {
  foreignKey: "userId"
});

Task.belongsTo(User, {
  foreignKey: "userId"
});

module.exports = Task;
