const mongoose = require('mongoose');

const url = process.env.MONGODB_URL;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
};

mongoose.connect(url, options)
  .then(result => {
    console.log('MongoDB is connected');
  })
  .catch(error => {
    console.log(error.message);
  })
  
const personSchema = new mongoose.Schema({
  name: String,
  number: String
});

personSchema.set('toJSON', {
  transform: (doc, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  }
})

module.exports =  mongoose.model('Person', personSchema);