const fs = require('fs');
const path = require('path');
const {Post} = require('../models/post');
const {Author} = require('../models/author');
const {Category, Tag} = require('../models/tagsAndCategory');

const findAndServe = function (Model, searchBy, res) {
  Model.findOne(searchBy)
    .then((data) => {
      if (!data) res.status(404).send();
      res.send(data);
    })
    .catch((e) => {
      res.status(500).send();
    });
};

const findByIdAndServe = function (Model, id, res) {
  findAndServe(Model, {_id: id}, res);
};

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
  findByIdAndServe(Author, req.body.authorId, res);
};

const serveUrl = function (req, res) {
  const pathUrl = path.join(__dirname, '../../templates/post.html');
  fs.readFile(pathUrl, 'utf8', (error, data) => {
    if (error) return res.status(500).send();
    res.send(data);
  });
};

const servePostContent = function (req, res) {
  const [, url] = req.body.postUrl.split('/');
  findAndServe(Post, {url}, res);
};

const servePostCategory = function (req, res) {
  findByIdAndServe(Category, req.body.category, res);
};

const servePostTag = function (req, res) {
  findByIdAndServe(Tag, req.body.tag, res);
};

const servePostNameAndUrl = function (req, res) {
  Post.findById(req.body.id)
    .then((post) => {
      if (!post) res.status(404).send();
      res.send({name: post.title, url: post.url});
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
  servePostCategory,
  servePostTag,
  servePostNameAndUrl,
};
