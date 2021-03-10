const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const upload = require('../../services/file-upload');

const singleUpload = upload.single('image');

// @route    POST api/upload/
// @desc     Upload a new file
// @access   Private
router.post('/', auth, (req, res) => {
  singleUpload(req, res, function (err) {
    if (err) {
      return res.status(422).send({
        errors: [{ title: 'File Upload Error', message: err.message }],
      });
    }

    return res.json({ imageUrl: req.file.location });
  });
});

module.exports = router;
