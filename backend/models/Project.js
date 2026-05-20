const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Project = sequelize.define("Project", {
  name: DataTypes.STRING,
  description: DataTypes.TEXT,
  createdBy: DataTypes.INTEGER,
});

module.exports = Project;