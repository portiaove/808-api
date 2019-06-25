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
    default: "data:image/png;base64,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"
  },
  beats: [{type: Schema.Types.ObjectId, ref:'Beats'}]
}, {
  timestamps: true,
  toJSON: {
    transform: function(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      delete ret.password;
      return ret;
    }
  }
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