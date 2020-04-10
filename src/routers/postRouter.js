const express = require('express');

const {
  servePosts,
  servePostAuthor,
  serveUrl,
  servePostContent,
  servePostCategory,
  servePostTag,
  servePostNameAndUrl,
} = require('../handlers/postHandlers');

const postRouter = new express.Router();

postRouter.get('/posts', servePosts);

postRouter.post('/postAuthor', servePostAuthor);
postRouter.use('/post', express.static('public'));
postRouter.post('/post/content', servePostContent);
postRouter.post('/post/category', servePostCategory);
postRouter.post('/post/tag', servePostTag);
postRouter.post('/post/nameAndUrl', servePostNameAndUrl);
postRouter.get('/post/:postUrl', serveUrl);

module.exports = {postRouter};
