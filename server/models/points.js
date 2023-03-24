const mongoose = require('mongoose');

const pointSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  value: {
    type: Number,
    required: true,
    default: 0
  }
});

const Point = mongoose.model('Point', pointSchema);

module.exports = Point;
