const mongoose = require('mongoose');

const LatestSchema = new mongoose.Schema({
  type: {
    type: String,
  },
  data: {
    type: Object,
  },
});

const Latest = mongoose.model('latest', LatestSchema);

module.exports = Latest;
