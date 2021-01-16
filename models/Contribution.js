const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContributionSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  link: {
    type: String
  },
  file: {
    type: String
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      }
    }
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
      text: {
        type: String,
        required: true
      },
      name: {
        type: String
      },
      avatar: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Contribution = mongoose.model('contribution', ContributionSchema);