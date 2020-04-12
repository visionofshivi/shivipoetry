const fs = require('fs');
const path = require('path');

const serveTemplate = function (fileName, res) {
  const pathUrl = path.join(__dirname, `../../templates/${fileName}`);
  fs.readFile(pathUrl, 'utf8', (error, data) => {
    if (error) return res.status(500).send();
    res.send(data);
  });
};

module.exports = {serveTemplate};
