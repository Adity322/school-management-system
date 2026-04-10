const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const auth = require("../middleware/authMiddleware");

// GET all tasks
router.get("/", auth, async (req, res) => {
  const tasks = await Task.find().populate("studentId");
  res.json(tasks);
});

// ADD task
router.post("/", auth, async (req, res) => {
  const task = new Task(req.body);
  await task.save();
  res.json(task);
});

// MARK COMPLETE
router.put("/:id", auth, async (req, res) => {
  const task = await Task.findByIdAndUpdate(
    req.params.id,
    { completed: true },
    { new: true }
  );
  res.json(task);
});

module.exports = router;