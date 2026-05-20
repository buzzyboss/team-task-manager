const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const auth = require("../middleware/authMiddleware");

router.post("/", auth, async (req, res) => {
  try {
    const task = await Task.create({
      ...req.body,
      createdBy: req.user.id,
    });

    res.json(task);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/", auth, async (req, res) => {
  const tasks = await Task.findAll();
  res.json(tasks);
});

router.put("/:id", auth, async (req, res) => {
  const task = await Task.findByPk(req.params.id);
  task.status = req.body.status;
  await task.save();
  res.json(task);
});

module.exports = router;