const mongoose = require('mongoose');
const User = require('./user.model');
const Schema = mongoose.Schema;

const beatSchema = new mongoose.Schema ({
  owner: {type: Schema.Types.ObjectId, ref:'User'},
  name: {
    type: String
  },
  kick: {
    type: [],
    default: [false, false, false, false, 
    false, false, false, false, 
    false, false, false, false, 
    false, false, false, false]
  },
  snare: {
    type: [],
    default: [false, false, false, false, 
    false, false, false, false, 
    false, false, false, false, 
    false, false, false, false]
  },
  cl_hat: {
    type: [],
    default: [false, false, false, false, 
    false, false, false, false, 
    false, false, false, false, 
    false, false, false, false]
  },
  op_hat: {
    type: [],
    default: [false, false, false, false, 
    false, false, false, false, 
    false, false, false, false, 
    false, false, false, false]
  },
  lo_tom: {
    type: [],
    default: [false, false, false, false, 
    false, false, false, false, 
    false, false, false, false, 
    false, false, false, false]
  },
  hi_tom: {
    type: [],
    default: [false, false, false, false, 
    false, false, false, false, 
    false, false, false, false, 
    false, false, false, false]
  },
  bpm: {
    type: Number,
    min: 56,
    max: 240,
  },
  likes: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true,
  toJSON: {
    transform: function(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
})

const Beats = mongoose.model('Beats', beatSchema)
module.exports = Beats;