const express = require('express');

const app = express();
app.use(express.static('public'));
app.use(express.json({limit: '1mb'}));
app.use(express.urlencoded({extended: true}));

module.exports = {app};
