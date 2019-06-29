const createError = require('http-errors');
const User = require('../models/user.model');
const Beats = require('../models/beats.model');

module.exports.getProfile = (req, res, next) => {
  const userId = req.params.id

  User.findById(userId)
  .populate('beats')
  .exec(function (err, user) {
    if (err) {
      throw createError(404, err)
    } else {
      res.status(201).json(user)
    }
  })
}

module.exports.editProfile = (req, res, next) => {

  User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
  .then(user => {
    if (!user) {
      throw createError(404, 'User not found')
    } else {
      res.status(201).json(user)
    }
  })
  .catch(next)
}