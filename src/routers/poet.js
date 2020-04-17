const express = require('express');
const cookieParser = require('cookie-parser');
const {auth} = require('../middleware/auth');
const {
  serveIsAvailableUsername,
  registerPoet,
  serveLoginPoet,
  serveDashboard,
} = require('../handlers/poet');

const poetRouter = new express.Router();

poetRouter.use(cookieParser());
poetRouter.post('/poet/username/available', serveIsAvailableUsername);
poetRouter.post('/poet/register', registerPoet);
poetRouter.post('/poet/login', serveLoginPoet);
poetRouter.get('/poet/dashboard', auth, serveDashboard);

poetRouter.use('/poet', express.static('public'));

module.exports = {poetRouter};
