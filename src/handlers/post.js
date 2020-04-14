const {Post} = require('../models/post');
const {serveTemplate} = require('./utils');
const LIMIT = 10;

const servePosts = async function (req, res) {
  const {pageNo} = req.body;
  try {
    const posts = await Post.find()
      .populate('author', ['displayName', 'userName'])
      .sort({date: 1})
      .skip(LIMIT * (pageNo - 1))
      .limit(LIMIT);
    res.send(posts);
  } catch (e) {
    res.status(500).send();
  }
};

const serveNoOfPages = async function (req, res) {
  try {
    const posts = await Post.find();
    res.send({pages: posts.length / LIMIT});
  } catch (e) {
    res.status(500).send();
  }
};

const serveUrl = function (req, res) {
  serveTemplate('post.html', res);
};

const servePostContent = async function (req, res) {
  const [, url] = req.body.postUrl.split('/');
  try {
    const post = await Post.findOne({url});
    await post
      .populate('author', ['displayName', 'userName'])
      .populate('preLink', ['title', 'url'])
      .populate('nextLink', ['title', 'url'])
      .populate('tags', ['name', 'url'])
      .populate('categories', ['name', 'url'])
      .execPopulate();
    if (!post) res.status(404).send();
    res.send(post);
  } catch (e) {
    res.status(500).send();
  }
};

module.exports = {servePosts, serveNoOfPages, serveUrl, servePostContent};