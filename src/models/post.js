const mongoose = require('mongoose');
// const validator = require('validator');

const Post = mongoose.model('Post', {
  post_date: {type: Object, default: new Date()},
  post_date_gmt: {type: Object, default: new Date()},
  post_content: {type: String, trim: true, required: true},
  post_title: {type: String, trim: true, required: true},
  post_excerpt: {type: String, trim: true},
  post_status: {type: String},
  comment_status: {type: String},
  post_name: {type: String, trim: true},
  post_modified: {type: Object, default: new Date()},
  post_modified_gmt: {type: Object, default: new Date()},
  post_parent: {},
  guid: {type: String},
  menu_order: {type: Number},
  post_type: {type: String},
  comment_count: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error('Comment count should be positive number');
      }
    },
  },
  total_views: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error('Total views should be positive number');
      }
    },
  },
});

module.exports = {Post};
