const { Schema, model } = require('mongoose');

// Schema to create thought model
const thoughtSchema = new Schema(
  {
    thoughtText: { 
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        // create getter method to format the timestamp on query...
    },
    username: {
                type: String,
                required: true,
            },
    reactions: [reactions],
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
thoughtSchema
  .virtual('reactionCount')
  .get(function () {
    return this.reactions.length;
  });

// Initialize our thought model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;