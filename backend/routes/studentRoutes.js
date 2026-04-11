const express = require("express");
const router = express.Router();
const Student = require("../models/student");
const authMiddleware = require("../middleware/authMiddleware");

// GET all students
router.get("/", authMiddleware, async (req, res) => {
  try {
    // 🔥 filter by admin
    const students = await Student.find({
      adminId: req.adminId,
    });

    res.json(students);
  } catch (error) {
    console.log("GET STUDENTS ERROR:", error);
    res.status(500).json({ msg: "Server error" });
  }
});

// ADD student
router.post("/", authMiddleware, async (req, res) => {
  try {
    const student = new Student({
      ...req.body,

      // 🔥 attach admin
      adminId: req.adminId,
    });

    await student.save();

    res.status(201).json(student);
  } catch (error) {
    console.log("CREATE STUDENT ERROR:", error);
    res.status(500).json({ msg: "Server error" });
  }
});

// UPDATE
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const updatedStudent = await Student.findOneAndUpdate(
      {
        _id: req.params.id,
        adminId: req.adminId, // 🔥 IMPORTANT (only owner can edit)
      },
      req.body,
      { new: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ msg: "Student not found" });
    }

    res.json(updatedStudent);
  } catch (error) {
    console.log("UPDATE STUDENT ERROR:", error);
    res.status(500).json({ msg: "Server error" });
  }
});
// DELETE
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const student = await Student.findOneAndDelete({
      _id: req.params.id,
      adminId: req.adminId, // 🔥 prevent deleting others data
    });

    if (!student) {
      return res.status(404).json({ msg: "Student not found" });
    }

    res.json({ msg: "Student deleted" });
  } catch (error) {
    console.log("DELETE ERROR:", error);
    res.status(500).json({ msg: "Server error" });
  }
});
module.exports = router;