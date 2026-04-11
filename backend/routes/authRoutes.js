const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");


// ================= REGISTER =================
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check if admin exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ msg: "Admin already exists" });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create admin
    const admin = new Admin({
      name,
      email,
      password: hashedPassword,
    });

    await admin.save();

    // ✅ CREATE TOKEN
    const token = jwt.sign(
      { id: admin._id },   // 🔥 IMPORTANT (admin isolation)
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // ✅ RESPONSE
    res.status(201).json({
      token,
      name: admin.name,
    });

  } catch (error) {
    console.log("REGISTER ERROR:", error);
    res.status(500).json({ msg: "Server error" });
  }
});


// ================= LOGIN =================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(400).json({ msg: "Admin not found" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // ✅ CREATE TOKEN
    const token = jwt.sign(
      { id: admin._id },   // 🔥 IMPORTANT
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // ✅ RESPONSE
    res.json({
      token,
      name: admin.name,
    });

  } catch (error) {
    console.log("LOGIN ERROR:", error);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;