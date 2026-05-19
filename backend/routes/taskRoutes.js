const express = require("express");
const router = express.Router();

const Task = require("../models/Task");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

// Create Task (Admin only)
router.post(
  "/",
  authMiddleware,
  roleMiddleware(["Admin"]),
  async (req, res) => {
    try {
      const { title, description, projectId, assignedTo, dueDate } = req.body;

      const task = await Task.create({
        title,
        description,
        projectId,
        assignedTo,
        dueDate,
        createdBy: req.user.id,
      });

      res.status(201).json(task);
    } catch {
      res.status(500).json({ message: "Server error" });
    }
  }
);

// Get Tasks (Everyone sees all)
router.get("/", authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.json(tasks);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

// Update Task
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;
    const task = await Task.findByPk(req.params.id);

    if (!task) return res.status(404).json({ message: "Task not found" });

    task.status = status;
    await task.save();

    res.json(task);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Delete Task (Admin only)
router.delete("/:id", authMiddleware, roleMiddleware(["Admin"]), async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    await task.destroy();

    res.json({ message: "Task deleted ✅" });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;