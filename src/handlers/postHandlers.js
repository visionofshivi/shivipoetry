const {Post} = require('../models/post');

const servePosts = function (req, res) {
  Post.find({})
    .then((post) => {
      res.send(post);
    })
    .catch((e) => {
      res.status(500).send();
    });
};

const servePost = function (req, res) {
  Post.findOne({postName: req.params.postName})
    .then((post) => {
      if (!post) return res.status(404).send();
      res.send(post);
    })
    .catch((e) => {
      res.status(500).send();
    });
};

module.exports = {servePosts, servePost};
