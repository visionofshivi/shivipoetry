const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {type: String, required: true, trim: true},
  url: {type: String, required: true, trim: true},
  posts: [{id: {type: mongoose.Schema.Types.ObjectId, ref: 'Post'}}],
});

const Category = mongoose.model('Category', schema);
const Tag = mongoose.model('Tag', schema);

module.exports = {Category, Tag};
