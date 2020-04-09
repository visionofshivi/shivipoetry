const express = require('express');
const path = require('path');

const {
  servePosts,
  servePostAuthor,
  serveUrl,
  servePostContent,
} = require('../handlers/postHandlers');

const postRouter = new express.Router();

postRouter.get('/posts', servePosts);

postRouter.post('/postAuthor', servePostAuthor);
postRouter.use('/post', express.static('public'));
postRouter.post('/post/content', servePostContent);
postRouter.get('/post/:postUrl', serveUrl);

module.exports = {postRouter};
