const express = require('express');
const {serveIsAvailableUsername, registerPoet} = require('../handlers/poet');

const poetRouter = new express.Router();

poetRouter.post('/poet/username/available', serveIsAvailableUsername);
poetRouter.post('/poet/register', registerPoet);
poetRouter.use('/poet', express.static('public'));

module.exports = {poetRouter};
