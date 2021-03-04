const mongoose = require('mongoose');

/* eslint-disable */
if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1);
}

const password = process.argv[2];
/* eslint-enable */

const url = `mongodb://yodi:${password}@cluster0-shard-00-00.lvcr8.mongodb.net:27017,cluster0-shard-00-01.lvcr8.mongodb.net:27017,cluster0-shard-00-02.lvcr8.mongodb.net:27017/note-app-test?ssl=true&replicaSet=atlas-joviuu-shard-0&authSource=admin&retryWrites=true&w=majority`;
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
  console.log("We're connected");
});

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
});

const Note = mongoose.model('Note', noteSchema);

const note = new Note({
  content: 'HTML is Easy',
  date: new Date(),
  important: true,
});

// Note.find({}).then(result => {
//   result.forEach(note => {
//     console.log(note);
//   });
//   db.close();
// });

note.save()
  .then(() => {
    console.log('note saved!');
    mongoose.connection.close();
  })
  .catch(error => {
    console.log(error);
  });
