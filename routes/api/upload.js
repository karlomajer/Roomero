const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const auth = require('../../middleware/auth');

// @route    POST api/upload/listings
// @desc     Upload a new listing
// @access   Private
router.post('/listings', auth, async (req, res) => {
  try {
    if (req.files === null) {
      return res.status(400).json({ msg: 'No file uploaded' });
    }

    const files = Array.isArray(req.files.file)
      ? [...req.files.file]
      : [req.files.file];
    const filePaths = [];

    files.forEach(file => {
      file.name = uuidv4() + path.extname(file.name);
      const filePath = `${path.dirname(
        require.main.filename
      )}/uploads/listings/${file.name}`;
      file.mv(filePath, err => {
        if (err) {
          console.error(err);
          return res.status(500).send(err);
        }
      });
      filePaths.push(`/uploads/listings/${file.name}`);
    });
    res.json({
      fileNames: files.map(file => file.name),
      filePaths
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

// @route    POST api/upload/avatars
// @desc     Upload a new avatar
// @access   Private
router.post('/avatars', auth, async (req, res) => {
  try {
    if (req.files === null) {
      return res.status(400).json({ msg: 'No file uploaded' });
    }

    const file = req.files.file;
    file.name = uuidv4() + path.extname(file.name);
    const filePath = `${path.dirname(require.main.filename)}/uploads/avatars/${
      file.name
    }`;
    file.mv(filePath, err => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }
    });

    res.json({
      fileNames: file.name,
      filePaths: `/uploads/avatars/${file.name}`
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
