const {Author} = require('../models/author');

const serveIsAvailableUsername = async function (req, res) {
  const result = await Author.findOne({userName: req.body.username});
  const isAvailable = result === null;
  res.send({isAvailable});
};

const registerPoet = function (req, res) {
  const {username, name, email, password} = req.body;
  const poet = {
    name,
    userName: username,
    password,
    email,
    registeredDate: new Date(),
    status: 'not approved',
    displayName: name,
  };
  const author = new Author(poet);
  author
    .save()
    .then((data) => res.send(data))
    .catch((e) => res.status(500).send());
};

module.exports = {serveIsAvailableUsername, registerPoet};
