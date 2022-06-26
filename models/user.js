const { Schema, model } = require('mongoose');

// Schema to create User model
const userSchema = new mongoose.Schema(
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
    thoughts:
        [
            {
                type: Schema.Types.ObjectId,
                ref: 'thought',
            },
        ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'user',
        },
    ],
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
userSchema
  .virtual('friendCount')
  .get(function () {
    return this.friends.length;
  });

// Initialize our User model
const User = mongoose.model('user', userSchema);

module.exports = User;