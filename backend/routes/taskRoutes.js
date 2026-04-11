const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const authMiddleware = require("../middleware/authMiddleware");

// GET all tasks
router.get("/", authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find({
      adminId: req.adminId, // 🔥 FILTER BY ADMIN
    }).populate("studentId");

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});
// ADD task
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, studentId } = req.body;

    const task = new Task({
      title,
      studentId,
      adminId: req.adminId, // 🔥 IMPORTANT
    });

    await task.save();

    res.json(task);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// MARK COMPLETE
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      {
        _id: req.params.id,
        adminId: req.adminId, // 🔥 SECURITY CHECK
      },
      { completed: true },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    res.json(task);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;