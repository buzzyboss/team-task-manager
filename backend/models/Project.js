const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");

const Project = sequelize.define("Project", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
});

// Relationship
Project.belongsTo(User, {
  foreignKey: "createdBy",
  as: "creator",
});

User.hasMany(Project, {
  foreignKey: "createdBy",
});

module.exports = Project;