const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { validationResult } = require('express-validator');

const Profile = require('../../models/Profile');

// @route    GET api/profile/me
// @desc     Get current user's profile
// @access   Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findById(req.profile.id);

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

// @route    POST api/profile
// @desc     Create or update a user profile
// @access   Private
router.post('/', [auth], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { avatar, previousAvatar, languages, location, bio } = req.body;

  const profileFields = {};
  profileFields.user = req.user.id;
  // To prevent uploading an empty string as avatar
  if (avatar) profileFields.avatar = avatar;
  profileFields.location = location;
  profileFields.bio = bio;
  if (languages) {
    // Split languages by comma into array and remove all whitespace
    profileFields.languages = languages
      .split(',')
      .map(language => language.trim());
  } else {
    profileFields.languages = [];
  }

  try {
    let profile = await Profile.findById(req.profile.id);

    if (profile) {
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true } // Set new to true to return document after the update is applied (to the profile variable, so we can use it later)
      );

      return res.json(profile);
    }

    profile = new Profile(profileFields);

    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

// @route    GET api/profile/:id
// @desc     Get profile by user ID
// @access   Public
router.get('/:id', async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);

    if (!profile) return res.status(400).json({ msg: 'Profile not found' });

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    // If user ID is not typical, for example 1, we can catch it this way and say profile not found
    // instead of server error. You get ObjectId error because in findOne method, it tries to search
    // for a user with the ID of 1 but it's not a valid ID since mongo documents have 12(?) characters
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Profile not found' });
    }
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
