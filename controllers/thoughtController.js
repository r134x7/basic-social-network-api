const { Thought, User } = require('../models');

module.exports = {
    getThoughts(req, res) { // gets all thoughts
        Thought.find()
        .then((thoughts) => res.json(thoughts))
        .catch((err) => {
            console.error({message: err});
            return res.status(500).json(err);
        });
    },
    getSingleThought(req, res) { // gets a single thought
        Thought.findOne({ _id: req.params.thoughtId })
          .then((thought) =>
            !thought
              ? res.status(404).json({ message: 'No thought with that ID' })
              : res.json(thought)
          )
          .catch((err) => res.status(500).json(err));
    },
    createThought(req, res) { // create a thought
      Thought.create(req.body)
        .then((thought) => {
          return User.findOneAndUpdate( // will tie the post to the user who posted it
            { _id: req.body.userId },
            { $addToSet: { thoughts: thought._id } },
            { new: true }
          );
        })
        .then((user) => res.json(user)) // then it creates the thought
        .catch((err) => res.status(500).json(err));
    },
    updateThought(req, res) { // update a thought
        Thought.findOneAndUpdate( // finds a thought and changes the thoughtText
          { _id: req.params.thoughtId },
          { $set: req.body }, // use { thoughtText: ... }
          { runValidators: true, new: true }
        )
          .then((thought) =>
            !thought // if no data
              ? res.status(404).json({ message: 'No thought with this id!' })
              : res.json(thought)
          )
          .catch((err) => res.status(500).json(err));
      },
    deleteThought(req, res) { // deletes a thought
        Thought.findOneAndDelete({ _id: req.params.thoughtId }) // needs user id in url params
        .then((thought) =>
            !thought
              ? res.status(404).json({ message: 'No thought with this id!' })
              : res.json({ message: 'Thought deleted!' })
          )
      .catch((err) => res.status(500).json(err));
  },
    createReaction(req, res) { // create a reaction
      Thought.findOneAndUpdate(
          { _id: req.params.thoughtId }, // needs thoughtId in url params
          { $addToSet: { reactions: req.body } },
          { runValidators: true, new: true }
        )
          .then((reaction) =>
            !reaction
              ? res
                  .status(404)
                  .json({ message: 'No reaction found with that ID' })
              : res.json(reaction)
          )
          .catch((err) => res.status(500).json(err));
      },
    removeReaction(req, res) { // delete a reaction
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId }, // needs related thoughtId in URL params
            { $pull: { reactions: { reactionId: req.params.reactionId } } }, // needs reactionId in URL params to delete
            { runValidators: true, new: true }
          )
            .then((user) =>
              !user
                ? res
                    .status(404)
                    .json({ message: 'No reaction found with that ID' })
                : res.json({ message: 'Reaction deleted!' })
            )
            .catch((err) => res.status(500).json(err));
        }
};