const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  name: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    default: '/uploads/avatars/default.png'
  },
  languages: {
    type: [String]
  },
  location: {
    type: String
  },
  bio: {
    type: String
  },
  reservations: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'reservation'
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
