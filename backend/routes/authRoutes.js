const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");


// ================= REGISTER =================
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ msg: "Admin already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const admin = new Admin({
      name,
      email,
      password: hashedPassword,
    });

    await admin.save();

    // ✅ CREATE TOKEN HERE
    const token = Jwt.sign(
      { id: admin._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // ✅ RETURN TOKEN + NAME
    res.json({
      token,
      name: admin.name,
    });

  } catch (error) {
    console.log("REGISTER ERROR:", error); // 🔥 IMPORTANT
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

    const token = jwt.sign(
      { id: admin._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ 
      token,
      name:admin.name
     });
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;