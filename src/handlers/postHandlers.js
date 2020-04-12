const fs = require('fs');
const path = require('path');
const {Post} = require('../models/post');

const servePosts = async function (req, res) {
  try {
    const posts = await Post.find()
      .populate('author', ['displayName', 'userName'])
      .sort({date: 1})
      .skip(0)
      .limit(15);
    res.send(posts);
  } catch (e) {
    res.status(500).send();
  }
};

const serveUrl = function (req, res) {
  const pathUrl = path.join(__dirname, '../../templates/post.html');
  fs.readFile(pathUrl, 'utf8', (error, data) => {
    if (error) return res.status(500).send();
    res.send(data);
  });
};

const servePostContent = async function (req, res) {
  const [, url] = req.body.postUrl.split('/');
  try {
    const post = await Post.findOne({url});
    await post
      .populate('author', ['displayName', 'userName'])
      .populate('preLink', ['title', 'url'])
      .populate('nextLink', ['title', 'url'])
      .populate('tags.id', ['name', 'url'])
      .populate('categories.id', ['name', 'url'])
      .execPopulate();
    if (!post) res.status(404).send();
    res.send(post);
  } catch (e) {
    res.status(500).send();
  }
};

module.exports = {servePosts, serveUrl, servePostContent};
