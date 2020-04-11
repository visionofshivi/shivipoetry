const fs = require('fs');
const path = require('path');
const {Post} = require('../models/post');

const servePosts = async function (req, res) {
  try {
    const posts = await Post.find({});
    posts.forEach(async (post, index) => {
      posts[index] = await post.populate('author').execPopulate();
      if (index == posts.length - 1) {
        res.send(posts.reverse());
      }
    });
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
      .populate('author')
      .populate('preLink')
      .populate('nextLink')
      .populate('tags.id')
      .populate('categories.id')
      .execPopulate();
    if (!post) res.status(404).send();
    res.send(post);
  } catch (e) {
    res.status(500).send();
  }
};

module.exports = {servePosts, serveUrl, servePostContent};
