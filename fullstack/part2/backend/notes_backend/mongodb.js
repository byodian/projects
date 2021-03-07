const mongoose = require('mongoose');
const User = require('./models/user');
const Note = require('./models/note');

/* eslint-disable */
if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1);
}

const password = process.argv[2];
/* eslint-enable */

const url = `mongodb://yodi:${password}@cluster0-shard-00-00.lvcr8.mongodb.net:27017,cluster0-shard-00-01.lvcr8.mongodb.net:27017,cluster0-shard-00-02.lvcr8.mongodb.net:27017/note-app?ssl=true&replicaSet=atlas-joviuu-shard-0&authSource=admin&retryWrites=true&w=majority`;
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
  console.log("We're connected");
});

const users = [
  {
    username: 'root',
    name: 'superuser',
    password: 'skelton'
  },
  {
    username: 'byodian',
    name: 'Baiyongjian',
    password: 'good'
  }
];

const notes = [
  {
    content: 'HTML is easy',
    date: new Date(),
    important: false,
  },
  {
    content: 'Browser can excute only JavaScript',
    date: new Date(),
    important: true
  }
];

const saveDocument = async (data, Model) => {
  for (let v of data) {
    let o = new Model(v);
    await o.save();
  }
};

const promise = async () => {
  await User.deleteMany({});
  await Note.deleteMany({});

  await saveDocument(notes, Note);
  await saveDocument(users, User);

  mongoose.connection.close(); 
};

promise();