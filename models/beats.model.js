const mongoose = require('mongoose');
const User = require('./user.model');
const Schema = mongoose.Schema;

const beatSchema = new mongoose.Schema ({
  owner: {type: Schema.Types.ObjectId, ref:'User'},
  name: {
    type: String
  },
  kick: [false, false, false, false, 
    false, false, false, false, 
    false, false, false, false, 
    false, false, false, false],
  snare: [false, false, false, false, 
    false, false, false, false, 
    false, false, false, false, 
    false, false, false, false],
  cl_hat: [false, false, false, false, 
    false, false, false, false, 
    false, false, false, false, 
    false, false, false, false],
  op_hat: [false, false, false, false, 
    false, false, false, false, 
    false, false, false, false, 
    false, false, false, false],
  lo_tom: [false, false, false, false, 
    false, false, false, false, 
    false, false, false, false, 
    false, false, false, false],
  hi_tom: [false, false, false, false, 
    false, false, false, false, 
    false, false, false, false, 
    false, false, false, false],
  bpm: {
    type: Number,
    min: 56,
    max: 240
  }
})

const Beats = mongoose.model('Beats', beatSchema)
module.exports = Beats;