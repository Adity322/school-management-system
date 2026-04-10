const express = require("express");
const router = express.Router();
const Student = require("../models/student");
const auth = require("../middleware/authMiddleware");

// GET all students
router.get("/", auth, async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

// ADD student
router.post("/", auth, async (req, res) => {
  const student = new Student(req.body);
  await student.save();
  res.json(student);
});

// UPDATE
router.put("/:id", auth, async (req, res) => {
  const updated = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// DELETE
router.delete("/:id", auth, async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
});

module.exports = router;