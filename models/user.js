const { Schema, model } = require('mongoose');

// Schema to create User model
const userSchema = new Schema(
  {
    username: { 
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        // insert custom validator
    },
    thoughts: {
        // array of _id values referencing the thought model...
    },
    friends: {
        // array of _id values referencing the user model...
    }
  },
  {
    // creating virtuals for friendCount
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// create virtual here

// Initialize our User model
const User = model('user', userSchema);

module.exports = User;