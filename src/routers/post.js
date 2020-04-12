const express = require('express');

const {servePosts, serveUrl, servePostContent} = require('../handlers/post');

const postRouter = new express.Router();
postRouter.get('/posts', servePosts);
postRouter.use('/post', express.static('public'));
postRouter.post('/post/content', servePostContent);
postRouter.get('/post/:postUrl', serveUrl);

module.exports = {postRouter};
