const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema(
  {
    challenge: {
      type: String,
      required: true,
    },
    opponent: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    code: {
      type: String,
    },
    input: {
      type: String,
    },
    output: {
      type: String,
    },
    result: {
      type: String,
      enum: ['pending', 'won', 'lost', 'tie'],
      default: 'pending',
    },
    startedAt: {
      type: Date,
    },
    endedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Challenge', challengeSchema);
