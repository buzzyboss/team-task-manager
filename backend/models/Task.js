const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Task = sequelize.define("Task", {
  title: DataTypes.STRING,
  description: DataTypes.TEXT,
  status: {
    type: DataTypes.STRING,
    defaultValue: "Todo",
  },
  dueDate: DataTypes.DATE,
  projectId: DataTypes.INTEGER,
  assignedTo: DataTypes.INTEGER,
  createdBy: DataTypes.INTEGER,
});

module.exports = Task;