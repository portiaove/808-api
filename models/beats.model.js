const mongoose = require('mongoose');
const User = require('./user.model');
const Likes = require('./likes.model');
const Schema = mongoose.Schema;
const steps = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]

const beatSchema = new mongoose.Schema ({
  owner: {type: Schema.Types.ObjectId, ref:'User'},
  name: {
    type: String
  },
  kick: {
    type: [],
    default: steps
  },
  snare: {
    type: [],
    default: steps
  },
  clHat: {
    type: [],
    default: steps
  },
  opHat: {
    type: [],
    default: steps
  },
  loTom: {
    type: [],
    default: steps
  },
  hiTom: {
    type: [],
    default: steps
  },
  bpm: {
    type: Number,
    min: 56,
    max: 240,
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: function(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
})

beatSchema.virtual('likes', {
  ref: 'Likes',
  localField: '_id',
  foreignField: 'beat',
  count: true
})

const Beats = mongoose.model('Beats', beatSchema)
module.exports = Beats;