const express = require('express');

const {
  serveByUrl,
  serveSelectorPosts,
  servePostContent,
  servePostAuthor,
} = require('../handlers/postsByHandlers');

const selectPosts = new express.Router();

selectPosts.use('/category', express.static('public'));
selectPosts.use('/tag', express.static('public'));
selectPosts.use('/author', express.static('public'));

selectPosts.post('/selector/postContent', servePostContent);
selectPosts.post('/selector/postAuthor', servePostAuthor);

selectPosts.get('/category/posts/:name', serveSelectorPosts);
selectPosts.get('/tag/posts/:name', serveSelectorPosts);
selectPosts.get('/author/posts/:name', serveSelectorPosts);

selectPosts.get('/category/:name', serveByUrl);
selectPosts.get('/tag/:name', serveByUrl);
selectPosts.get('/author/:name', serveByUrl);

module.exports = {postsByRouter: selectPosts};
