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
        validate: { // source: https://mongoosejs.com/docs/validation.html#built-in-validators
          validator: function(email) {
            return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(email); // email regex from previous regex assignment
          },
          message: foo => `${foo.value} is not a valid email address...`
        },
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
const User = model('user', userSchema);

module.exports = User;