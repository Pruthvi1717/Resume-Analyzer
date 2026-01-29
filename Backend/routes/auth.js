const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const extractPdf = require("pdf-extraction");



const User = require("../Models/User");
require("dotenv").config();

const router = express.Router();


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});


const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files allowed"), false);
    }
  },
});


router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(StatusCodes.CONFLICT)
        .json({ message: "Email already exists" });
    }

    const hashedPass = await bcrypt.hash(password, 10);
    await new User({ name, email, password: hashedPass }).save();

    res.status(StatusCodes.CREATED).json({
      message: "User registered",
    });
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Server error" });
  }
});


router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(StatusCodes.OK).json({ token });
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Server error" });
  }
});


// router.post(
//   "/upload/pdf",
//   upload.single("pdfFile"),
//   (req, res) => {
//     if (!req.file) {
//       return res
//         .status(StatusCodes.BAD_REQUEST)
//         .json({ message: "No file uploaded" });
//     }

//     return res.status(StatusCodes.OK).json({
//       pdfUrl: `http://localhost:8080/uploads/${req.file.filename}`,
//     });
//   }
// );
router.post(
  "/upload/pdf",
  upload.single("pdfFile"),
  async (req, res) => {
    try {
      console.log("FILE RECEIVED:", req.file);

      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      // ✅ ADD THESE 3 LINES
      const buffer = fs.readFileSync(req.file.path);
      const data = await extractPdf(buffer);

      return res.status(200).json({
        message: "PDF uploaded successfully",
        pdfUrl: `http://localhost:8080/uploads/${req.file.filename}`,
        resumeText: data.text,
      });

    } catch (err) {
      console.error("PDF EXTRACTION ERROR:", err);
      return res.status(500).json({ message: "Failed to extract PDF" });
    }
  }
);






module.exports = router;
