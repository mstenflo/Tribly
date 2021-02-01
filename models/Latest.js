const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LatestSchema = new mongoose.Schema({
    type: {
      type: String
    },
    data: {
      type: Object
    }
});

module.exports = Latest = mongoose.model('latest', LatestSchema);