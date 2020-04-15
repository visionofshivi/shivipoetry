const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
  name: {type: String, trim: true, required: true},
  userName: {type: String, trim: true, required: true, unique: true},
  password: {type: String, trim: true, required: true},
  email: {type: String, trim: true, required: true, unique: true},
  registeredDate: {type: Number},
  status: {type: String, default: 'not approved'},
  displayName: {type: String},
});

authorSchema.virtual('posts', {
  ref: 'Post',
  localField: '_id',
  foreignField: 'author',
});

const Author = mongoose.model('Author', authorSchema);
module.exports = {Author};
