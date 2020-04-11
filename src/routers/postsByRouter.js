const express = require('express');

const {
  serveByUrl,
  serveSelectorPosts,
  servePostContent,
} = require('../handlers/postsByHandlers');

const selectPosts = new express.Router();

selectPosts.use('/category', express.static('public'));
selectPosts.use('/tag', express.static('public'));
selectPosts.use('/author', express.static('public'));

selectPosts.post('/selector/postContent', servePostContent);

selectPosts.get('/posts/:key/:value', serveSelectorPosts);

selectPosts.get('/category/:name', serveByUrl);
selectPosts.get('/tag/:name', serveByUrl);
selectPosts.get('/author/:name', serveByUrl);

module.exports = {postsByRouter: selectPosts};
