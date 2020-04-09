const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
  name: {type: String},
  userName: {type: String},
  password: {type: String},
  email: {type: String},
  registeredDate: {type: Number},
  status: {type: String},
  displayName: {type: String},
  posts: {type: Array},
});

const Author = mongoose.model('Author', authorSchema);
module.exports = {Author};
