const createError = require('http-errors');
const User = require('../models/user.model');
const Beats = require('../models/beats.model');
const Like = require('../models/likes.model');

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

module.exports.getProfileBeats = (req, res, next) => {
  const userId = req.params.id

  User.findById(userId)
  .populate('beats')
  // .populate('likes')  //ACABO DE AÑADIR !!!!!!!!!
  .then(user => res.status(201).json(user.beats))
  .catch(next)
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


module.exports.getLikes = (req, res, next) => {
  const user = req.user.id

  Like.find({ user })
  .populate('beat')
  .then(likes => res.status(201).json(likes))
  .catch(next)
}
