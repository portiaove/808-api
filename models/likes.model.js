const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const likeSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  beat: { type: Schema.Types.ObjectId, ref: 'Beats' }
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

const Likes = mongoose.model('Likes', likeSchema);
module.exports = Likes;