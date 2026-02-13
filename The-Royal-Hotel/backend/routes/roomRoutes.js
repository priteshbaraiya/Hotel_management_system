const express = require('express');
const router = express.Router();
const multer = require('multer');
const Room = require('../models/Room');
const path = require('path');

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Append extension
  }
});

// File filter for images
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = /jpeg|jpg|png|gif/;
  const mimetype = allowedFileTypes.test(file.mimetype);
  const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());

  if (mimetype && extname) {
    return cb(null, true);
  }
  cb('Error: File upload only supports the following filetypes - ' + allowedFileTypes);
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

// @route   GET api/rooms
// @desc    Get all rooms
// @access  Public
router.get('/', async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/rooms
// @desc    Create a new room
// @access  Public (for now, would be private in a real app)
router.post('/', upload.single('image'), async (req, res) => {
  const { title, description, price, amenities } = req.body;
  const imagePath = req.file ? `uploads/${req.file.filename}` : '';

  try {
    const newRoom = new Room({
      title,
      description,
      price,
      amenities: amenities ? amenities.split(',') : [],
      imagePath
    });

    const room = await newRoom.save();
    res.json(room);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
