const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  website: {
    type: String
  },
  avatar: {
    type: String
  },
  location: {
    type: String
  },
  skills: {
    type: [String]
  },
  bio: {
    type: String
  },
  social: {
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    instagram: {
      type: String
    }
  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);