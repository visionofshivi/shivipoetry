const fs = require('fs');
const path = require('path');

const {Post} = require('../models/post');
const {Author} = require('../models/author');
const {Category, Tag} = require('../models/tagsAndCategory');

const findAndServe = async function (Model, findBody, res) {
  try {
    const result = await Model.findOne(findBody);
    if (!result) return res.status(404).send();
    res.send(result);
  } catch (e) {
    res.status(500).send();
  }
};

const serveByUrl = function (req, res) {
  const pathUrl = path.join(__dirname, '../../templates/postsBy.html');
  fs.readFile(pathUrl, 'utf8', (error, data) => {
    if (error) return res.status(500).send();
    res.send(data);
  });
};

const servePosts = function (result, res) {
  result.posts.forEach(async (post, index) => {
    result.posts[index] = await post.populate('author').execPopulate();
    if (index == result.posts.length - 1) {
      res.send(result.posts.reverse());
    }
  });
};

const serveSelectorPosts = async function (req, res) {
  const {key, value} = req.params;
  const models = {category: Category, author: Author, tag: Tag};
  const Model = models[key];
  if (key === 'author') {
    try {
      const result = await Model.findOne({userName: value});
      await result.populate('posts').execPopulate();
      if (!result) return res.status(404).send();
      servePosts(result, res);
    } catch (e) {
      res.status(500).send();
    }
  }
};

const servePostContent = function (req, res) {
  findAndServe(Post, {_id: req.body.id}, res);
};

module.exports = {
  serveByUrl,
  serveSelectorPosts,
  servePostContent,
};
