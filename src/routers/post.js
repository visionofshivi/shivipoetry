const express = require('express');

const {
  servePosts,
  serveNoOfPages,
  serveUrl,
  servePostContent,
} = require('../handlers/post');

const postRouter = new express.Router();

postRouter.post('/posts', servePosts);
postRouter.get('/posts/pagination', serveNoOfPages);
postRouter.use('/post', express.static('public'));
postRouter.post('/post/content', servePostContent);
postRouter.get('/post/:postUrl', serveUrl);

module.exports = {postRouter};
