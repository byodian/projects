const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const url = process.env.MONGODB_URL; // eslint-disable-line

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
};

mongoose.connect(url, options)
  .then(() => {
    console.log('MongoDB is connected');
  })
  .catch(error => {
    console.log(error.message);
  });
  
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
    unique: true
  },
  number: {
    type: String,
    required: true,
    minLength: 8,
    unique: true
  }
});
personSchema.plugin(uniqueValidator);

personSchema.set('toJSON', {
  transform: (doc, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports =  mongoose.model('Person', personSchema);