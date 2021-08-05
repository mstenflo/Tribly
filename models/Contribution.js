const mongoose = require('mongoose');

const ContributionSchema = new mongoose.Schema({
  author: {
    name: {
      type: String,
    },
    id: {
      type: String,
    },
    avatar: {
      type: String,
    },
  },
  group: {
    name: {
      type: String,
    },
    id: {
      type: String,
    },
  },
  topic: {
    title: {
      type: String,
    },
    id: {
      type: String,
    },
  },
  link: {
    type: String,
  },
  file: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  filetype: {
    type: String,
  },
  youtube: {
    type: String,
  },
  likes: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
      },
    },
  ],
  comments: [
    {
      author: {
        name: {
          type: String,
        },
        id: {
          type: String,
        },
        avatar: {
          type: String,
        },
      },
      text: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

const Contribution = mongoose.model('contribution', ContributionSchema);

module.exports = Contribution;
