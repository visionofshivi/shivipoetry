const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  author: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Author'},
  date: {type: Number},
  content: {type: String, required: true, trim: true},
  title: {type: String, required: true, trim: true},
  status: {type: String, required: true},
  url: {type: String, required: true, trim: true},
  modified: {type: Number},
  preLink: {type: mongoose.Schema.Types.ObjectId, ref: 'Post'},
  nextLink: {type: mongoose.Schema.Types.ObjectId, ref: 'Post'},
  type: {type: String, trim: true},
  commentStatus: {type: String},
  commentCount: {type: Number},
  tags: [{type: mongoose.Schema.Types.ObjectId, ref: 'Tag'}],
  categories: [{type: mongoose.Schema.Types.ObjectId, ref: 'Category'}],
});

const Post = mongoose.model('Post', PostSchema);
module.exports = {Post};
