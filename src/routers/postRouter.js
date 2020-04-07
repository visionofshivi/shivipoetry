const express = require('express');

const {servePosts, servePost} = require('../handlers/postHandlers');

const postRouter = new express.Router();
postRouter.get('/posts', servePosts);
postRouter.get('/posts/:postName', servePost);
module.exports = {postRouter};
