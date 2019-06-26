const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Beats = require('./beats.model');
const Schema = mongoose.Schema;
const SALT_WORK_FACTOR = 10;
const EMAIL_PATTERN = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const URL_PATTERN = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
const PASS_PATTERN = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
// Password must contain at least 8 characters, 1 number, 1 upper and 1 lowercase

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [EMAIL_PATTERN, 'Invalid Email']
  },
  password: {
    type: String,
    required: true,
    match: [PASS_PATTERN, 'Password must contain at least 8 characters, 1 number, 1 upper and 1 lowercase']
  },
  avatarURL: {
    type: String,
    match: [URL_PATTERN, 'Image Url is invalid'],
    default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIBUhvKJgtQNMsZ2D6TtI_-7rjPr1NYp6DEzYZ_KX3w4ZLB-tW"
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: function(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      delete ret.password;
      return ret;
    }
  }
})

userSchema.virtual('beats', {
  ref: 'Beats',
  localField: '_id',
  foreignField: 'owner',
  options: { sort: { createdAt: -1 } }
})

userSchema.pre('save', function(next) {
  const user = this;

  if(!user.isModified('password')) {
    next();
  } else {
    bcrypt.genSalt(SALT_WORK_FACTOR)
      .then(salt => bcrypt.hash(user.password, salt))
      .then(hash => {
        user.password = hash;
        next();
      })
      .catch(error => next(error))
  }
})

userSchema.methods.checkPassword = function (password) {
  return bcrypt.compare(password, this.password);
}

const User = mongoose.model('User', userSchema);
module.exports = User;