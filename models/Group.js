const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GroupSchema = new Schema({
  admin: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  contributors: [String],
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  inviteCode: {
    type: String,
    required: true
  },
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

module.exports = Group = mongoose.model('groups', GroupSchema);