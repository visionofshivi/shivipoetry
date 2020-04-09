const fs = require('fs');
const path = require('path');
const {Post} = require('../models/post');
const {Author} = require('../models/author');

const servePosts = function (req, res) {
  Post.find({})
    .then((post) => {
      res.send(post.reverse());
    })
    .catch((e) => {
      res.status(500).send();
    });
};

const servePostAuthor = function (req, res) {
  Author.findById(req.body.authorId)
    .then((author) => res.send(author))
    .catch((e) => res.status(500).end());
};

const serveUrl = function (req, res) {
  const pathUrl = path.join(__dirname, '../../templates/post.html');
  fs.readFile(pathUrl, 'utf8', (error, data) => {
    if (error) return res.status(404).send();
    res.send(data);
  });
};

const servePostContent = function (req, res) {
  const [, url] = req.body.postUrl.split('/');
  Post.findOne({url})
    .then((post) => {
      if (!post) return res.status(404).send();
      res.send(post);
    })
    .catch((e) => {
      res.status(500).send();
    });
};

module.exports = {
  servePosts,
  servePostAuthor,
  serveUrl,
  servePostContent,
};
