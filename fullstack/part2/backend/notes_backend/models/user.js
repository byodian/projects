const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  name: String,
  passwordHash: String,
  // Mongo 本质上不知道 这是一个引用 Note 的字段，这种中语法完全
  // 与 Mongoose 的定义有关
  notes: [
    {
      // ObjectId
      type: mongoose.Schema.Types.ObjectId,
      // note-style
      ref: 'Note'
    }
  ]
});

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  }
});

userSchema.plugin(uniqueValidator);

const User = mongoose.model('User', userSchema);
module.exports = User;
