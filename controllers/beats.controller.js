const createError = require('http-errors');
const Beats = require('../models/beats.model');
const User = require('../models/user.model');
const Like = require('../models/likes.model');

module.exports.create = (req, res, next) => {
  const { name, kick, snare, clHat, opHat, loTom, hiTom, bpm } = req.body;
  const owner = req.user.id
 
  const beat = new Beats({
    owner,
    name,
    kick,
    snare,
    clHat,
    opHat,
    hiTom,
    loTom,
    bpm
  })

  beat.save()
  .then(beat => res.status(201).json(beat))
  .catch(next)
}

module.exports.list = (req, res, next) => {
  const { sortedBy } = req.query;
  const criterial = {};

  Beats.find()
  .populate('likes')
  .populate('owner')
  .sort({[sortedBy]: -1})  
  .then(beats => {
    res.status(201).json(beats)
  })
  .catch(next)
}

module.exports.detail = (req, res, next) => {
  const id = req.params.id;

  Beats.findById(id)
  .populate('likes')
  .then(beat => { 
    res.status(201).json(beat) 
  })
  .catch(next)
}

module.exports.delete = (req, res, next) => {
  const id = req.params.id;

  Beats.findByIdAndDelete(id)
  .then(beat => {
    if (!beat) {
      throw createError(404, 'Beat not found!')
    } else {
      res.status(204).json()
    }
  })
  .catch(next)
}

module.exports.checkLiked = (req, res, next) => {
  const user = req.user.id
  const beat = req.params.id

  Like.findOne({user, beat})
  .then(like => {
    if (!like) {
      res.status(201).json(false)
    } else {
      res.status(201).json(true)
    }
  })
  .catch(next)
}

module.exports.like = (req, res, next) => {
  const user = req.user.id
  const beat = req.params.id

  Like.findOne({user, beat})
  .then(like => {
    if (!like) {
      const like = new Like({ user, beat })
      like.save()
      .then(like => res.status(201).json(like))
      .catch(next)
    } else {
      throw createError(400, 'You already liked this!')
    }
  })
  .catch(next)
}

module.exports.notLike = (req, res, next) => {
  const user = req.user.id
  const beat = req.params.id

  Like.findOneAndDelete({ user, beat })
  .then(like => res.status(204).json())
  .catch(next)
}