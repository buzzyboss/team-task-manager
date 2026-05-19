const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = require("./User");
const Project = require("./Project");

const Task = sequelize.define("Task", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  status: {
    type: DataTypes.ENUM("Todo", "In Progress", "Completed"),
    defaultValue: "Todo",
  },
  dueDate: {
    type: DataTypes.DATEONLY,
  },
});

// ✅ Relationships

// Task belongs to a Project
Task.belongsTo(Project, {
  foreignKey: "projectId",
});

// Task assigned to a User
Task.belongsTo(User, {
  foreignKey: "assignedTo",
});

// Task created by a User (Admin)
Task.belongsTo(User, {
  foreignKey: "createdBy",
  as: "creator",
});

module.exports = Task;