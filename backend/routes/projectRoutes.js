const express = require("express");
const router = express.Router();

const Project = require("../models/Project");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

// Create Project (Admin only)
router.post(
  "/",
  authMiddleware,
  async (req, res) => {
    try {
      const { name, description } = req.body;

      const project = await Project.create({
        name,
        description,
        createdBy: req.user.id,
      });

      res.status(201).json(project);

    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  }
);

// Get Projects (Everyone sees all)
router.get("/", authMiddleware, async (req, res) => {
  try {
    const projects = await Project.findAll();
    res.json(projects);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;