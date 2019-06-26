const createError = require('http-errors');
const Beats = require('../models/beats.model');
const User = require('../models/user.model');

module.exports.create = (req, res, next) => {
  const { name, kick, snare, cl_hat, op_hat, lo_tom, hi_tom, bpm } = req.body;
  const owner = req.user.id
  if (owner === undefined) {
    throw createError(401, 'No beats without login')
  } else {
  const beat = new Beats({
    owner,
    name,
    kick,
    snare,
    cl_hat,
    op_hat,
    hi_tom,
    lo_tom,
    bpm
  })

  beat.save()
  .then(beat => res.status(201).json(beat))
  .catch(next)
}
}

