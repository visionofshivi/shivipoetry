const {Author} = require('../models/author');
const {Tag} = require('../models/tag');
const {Category} = require('../models/category');
const {serveTemplate} = require('./utils');

const serveByUrl = function (req, res) {
  serveTemplate('postsBy.html', res);
};

const serveAuthorsPosts = async function (res, userName) {
  try {
    const result = await Author.findOne({userName});
    await result
      .populate({path: 'posts', options: {limit: 5, skip: 0, sort: {date: 1}}})
      .execPopulate();
    if (!result.posts) return res.status(404).send();
    res.send({posts: result.posts, author: result});
  } catch (e) {
    res.status(500).send();
  }
};

const serveTagsOrCategoriesPosts = async function (res, modelName, url) {
  const models = {category: Category, tag: Tag};
  const Model = models[modelName];
  try {
    const result = await Model.findOne({url});
    await result
      .populate({
        path: 'posts',
        options: {limit: 5, skip: 0, sort: {date: 1}},
        populate: {path: 'author'},
      })
      .execPopulate();

    if (!result.posts) return res.status(404).send();
    res.send(result.posts);
  } catch (e) {
    console.log('error');
    res.status(500).send();
  }
};

const serveSelectorPosts = function (req, res) {
  const {key, value} = req.params;
  if (key === 'author') {
    return serveAuthorsPosts(res, value);
  }
  serveTagsOrCategoriesPosts(res, key, value);
};

module.exports = {serveByUrl, serveSelectorPosts};
