const mongodb = require('mongodb');
const {Author} = require('../models/author');
const {Post} = require('../models/post');
const {Category, Tag} = require('../models/tagsAndCategory');
const {serveTemplate} = require('./utils');

const serveByUrl = function (req, res) {
  serveTemplate('postsBy.html', res);
};

const servePosts = async function (result, res) {
  // result.posts.forEach(async (post, index) => {
  //   result.posts[index] = await post.populate('author').execPopulate();
  //   if (index == result.posts.length - 1) {
  //     res.send(result.posts.reverse());
  //   }
  // });
};

const serveAuthorsPosts = async function (res, userName) {
  try {
    const result = await Author.findOne({userName});
    await result
      .populate({path: 'posts', options: {limit: 5, skip: 0, sort: {date: 1}}})
      .execPopulate();
    if (!result.posts) return res.status(404).send();
    res.send({posts: result.posts, author: result});
  } catch (e) {
    res.status(500).send();
  }
};

const serveTagsOrCategoriesPosts = async function (res, modelName, url) {
  const models = {category: Category, tag: Tag};
  const Model = models[modelName];
  try {
    const {_id} = await Model.findOne({url});
    const result = await Post.find({'categories.id': _id});
    console.log(result);
    // await result.populate('posts').execPopulate();
    // res.send(result.posts);
    // if (!result) return res.status(404).send();
    // servePosts(result, res);
  } catch (e) {
    console.log('error');
    res.status(500).send();
  }
};

const serveSelectorPosts = function (req, res) {
  const {key, value} = req.params;
  if (key === 'author') {
    return serveAuthorsPosts(res, value);
  }
  serveTagsOrCategoriesPosts(res, key, value);
};

module.exports = {serveByUrl, serveSelectorPosts};
