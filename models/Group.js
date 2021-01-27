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
  topics: [
    {
      author: {
        name: {
          type: String
        },
        id: {
          type: String
        },
        avatar: {
          type: String
        }
      },
      title: {
        type: String,
        required: true
      },
      text: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      },
      comments: [
        {
          author: {
            name: {
              type: String
            },
            id: {
              type: String
            },
            avatar: {
              type: String
            }
          },
          text: {
            type: String,
            required: true
          },
          date: {
            type: Date,
            default: Date.now
          }
        }
      ],
      // contributions: [
      //   {
      //     author: {
      //       name: {
      //         type: String
      //       },
      //       id: {
      //         type: String
      //       },
      //       avatar: {
      //         type: String
      //       }
      //     },
      //     title: {
      //       type: String
      //     },
      //     text: {
      //       type: String
      //     },
      //     file: {
      //       type: String,
      //     },
      //     filetype: {
      //       type: String,
      //     },
      //     youtube: {
      //       type: String
      //     },
      //     link: {
      //       type: String
      //     },
      //     date: {
      //       type: Date,
      //       default: Date.now
      //     },
      //     comments: [
      //       {
      //         author: {
      //           name: {
      //             type: String
      //           },
      //           id: {
      //             type: String
      //           },
      //           avatar: {
      //             type: String
      //           }
      //         },
      //         text: {
      //           type: String,
      //           required: true
      //         },
      //         date: {
      //           type: Date,
      //           default: Date.now
      //         }
      //       }
      //     ],
      //   }
      // ],
    }
  ],
  comments: [
    {
      author: {
        name: {
          type: String
        },
        id: {
          type: String
        },
        avatar: {
          type: String
        }
      },
      text: {
        type: String,
        required: true
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