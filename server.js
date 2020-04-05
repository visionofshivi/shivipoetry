const {MongoClient} = require('mongodb');

const connectionUrl = 'mongodb://127.0.0.1:27017';
const databaseName = 'shivipoetry';

MongoClient.connect(connectionUrl, {useNewUrlParser: true}, (error, client) => {
  if (error) {
    return console.log('Unable to connect database');
  }
  console.log('connected');
});
