const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  name: {
    type: String
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
  },
  groups: [
    {
      id: {
        type: String
      },
      name: {
        type: String
      },
      description: {
        type: String
      }
    }
  ]
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);