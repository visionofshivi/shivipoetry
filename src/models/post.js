const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  author: {type: String},
  date: {type: Number},
  content: {type: String, required: true, trim: true},
  title: {type: String, required: true, trim: true},
  status: {type: String, required: true},
  url: {type: String, required: true, trim: true},
  modified: {type: Number},
  preLink: {type: String},
  nextLink: {type: String},
  type: {type: String, trim: true},
  commentStatus: {type: String},
  commentCount: {type: Number},
  tags: {type: Array},
  categories: {type: Array},
});

const Post = mongoose.model('Post', PostSchema);
module.exports = {Post};
