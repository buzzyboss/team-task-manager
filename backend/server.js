require("dotenv").config();

const sequelize = require("./config/database");
const express = require("express");
const cors = require("cors");

const authMiddleware = require("./middleware/authMiddleware");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/projects", require("./routes/projectRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));

app.get("/api/dashboard", authMiddleware, async (req, res) => {
  try {
    const Task = require("./models/Task");
    const { Op } = require("sequelize");

    const totalTasks = await Task.count();

    const completedTasks = await Task.count({
      where: { status: "Completed" },
    });

    const pendingTasks = await Task.count({
      where: { status: { [Op.ne]: "Completed" } },
    });

    const overdueTasks = await Task.count({
      where: {
        dueDate: { [Op.lt]: new Date() },
        status: { [Op.ne]: "Completed" },
      },
    });

    res.json({
      totalTasks,
      completedTasks,
      pendingTasks,
      overdueTasks,
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

const PORT = 4000;

sequelize.authenticate()
  .then(() => sequelize.sync())
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  });