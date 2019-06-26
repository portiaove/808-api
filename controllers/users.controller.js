const createError = require('http-errors');
const User = require('../models/user.model');
const Beats = require('../models/beats.model');

module.exports.profile = (req, res, next) => {
  const userId = req.params.id

  User.findById(userId)
  .populate('beats')
  .exec(function (err, beats) {
    if (err) {
      throw createError(404, err)
    } else {
      res.status(201).json(beats)
    }
  })
}