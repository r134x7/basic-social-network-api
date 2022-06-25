const { Schema, model } = require('mongoose');

// create a subdocument
const reactionsSchema = new mongoose.Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        // need to set default value to a new ObjectId
    },
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280,
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        // create getter method to format the timestamp on query...
    }
})

// Schema to create thought model
const thoughtSchema = new mongoose.Schema(
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
    reactions: [reactionsSchema],
  },
  {
    // creating virtuals for reactionCount
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
const Thought = mongoose.model('thought', thoughtSchema);



module.exports = Thought;