const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
  name: {type: String, required: true, trim: true},
  url: {type: String, required: true, trim: true},
});

tagSchema.virtual('posts', {
  ref: 'Post',
  localField: '_id',
  foreignField: 'tags',
});

const Tag = mongoose.model('Tag', tagSchema);

module.exports = {Tag};
