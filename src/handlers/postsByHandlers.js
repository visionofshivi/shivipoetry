const fs = require('fs');
const path = require('path');

const {Post} = require('../models/post');
const {Author} = require('../models/author');
const {Category, Tag} = require('../models/tagsAndCategory');

const findAndServe = function (Model, findBody, res) {
  Model.findOne(findBody)
    .then((data) => {
      if (!data) return res.status(404).send();
      res.send(data);
    })
    .catch((e) => res.status(500).send());
};

const serveByUrl = function (req, res) {
  const pathUrl = path.join(__dirname, '../../templates/postsBy.html');
  fs.readFile(pathUrl, 'utf8', (error, data) => {
    if (error) return res.status(500).send();
    res.send(data);
  });
};

const servePostsIds = function (Model, name, res) {
  findAndServe(Model, {url: name}, res);
};

const serveSelectorPosts = function (req, res) {
  const [, modelName] = req.path.split('/');
  const models = {category: Category, author: Author, tag: Tag};
  servePostsIds(models[modelName], req.params.name, res);
};

const servePostContent = function (req, res) {
  findAndServe(Post, {_id: req.body.id}, res);
};

const servePostAuthor = function (req, res) {
  findAndServe(Author, {_id: req.body.authorId}, res);
};

module.exports = {
  serveByUrl,
  serveSelectorPosts,
  servePostContent,
  servePostAuthor,
};
