const express = require('express');
require('./db/connectDB');
const {postRouter} = require('./routers/postRouter');

const app = express();
app.use(express.static('public'));
app.use(express.json({limit: '1mb'}));
app.use(express.urlencoded({extended: true}));
app.use(postRouter);
module.exports = {app};
