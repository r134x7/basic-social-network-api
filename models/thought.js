const { Schema, model, Types } = require('mongoose');

// const test = () => `${this.createdAt.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} at ${this.createdAt.toLocaleTimeString('en-US', {hour: 'numeric', minute: 'numeric'})}` // using arrow function here instead to test what works

// create a subdocument
const reactionsSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
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
        get: timeFormat
      },
},
    {
    toJSON: {
        getters: true,
      },
    id: false,
    })

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
        get: timeFormat
    },
    username: {
                type: String,
                required: true,
            },
    reactions: [reactionsSchema],
    userId: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
    ],
  },
  {
    // creating virtuals for reactionCount
    toJSON: {
      virtuals: true,
      getters: true,
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

function timeFormat(createdAt) { //getter function
    return `${createdAt.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} at ${createdAt.toLocaleTimeString('en-US', {hour: 'numeric', minute: 'numeric'})}`
}


// Initialize our thought model
const Thought = model('thought', thoughtSchema);

// `${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} at ${new Date().toLocaleTimeString('en-US', {hour: 'numeric', minute: 'numeric'})}`

module.exports = Thought;