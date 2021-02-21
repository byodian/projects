const mongoose = require('mongoose');

if (process.argv.length < 5) {
  console.log('Please provide the password as an argument: node mongo.js <password> <name> <number>');
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb://yodi:${password}@cluster0-shard-00-00.lvcr8.mongodb.net:27017,cluster0-shard-00-01.lvcr8.mongodb.net:27017,cluster0-shard-00-02.lvcr8.mongodb.net:27017/phonebook-app?ssl=true&replicaSet=atlas-joviuu-shard-0&authSource=admin&retryWrites=true&w=majority`;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
};

mongoose.connect(url, options);
const db = mongoose.connection;

db.on('error', console.error.bind(console,'connection error'));
db.once('open', () => {
  console.log("We're connected");
})

const personSchema = new mongoose.Schema({
  name: String,
  number: String
});

const Person = mongoose.model('Person', personSchema);

const person = new Person({
  name: process.argv[3],
  number: process.argv[4]
})

person.save().then(result => {
  console.log(`added ${process.argv[3]} ${process.argv[4]} to phonebook`);
  db.close();
})

