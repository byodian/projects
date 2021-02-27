const mongoose = require('mongoose');

if (process.argv.length < 4) {
  console.log('Please provide the password as an argument: node mongo.js <name> <number>');
  process.exit(1);
}

const url = process.env.MONGODB_URL;

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

module.exports =  mongoose.model('Person', personSchema);