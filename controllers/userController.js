const { Thought, User } = require('../models');

module.exports = {
    getUsers(req, res) { // gets all users
        User.find()
        .then((user) => res.json(user))
        .catch((err) => {
            console.error({message: err});
            return res.status(500).json(err);
        });
    },
    getSingleUser(req, res) { // gets a single user
        User.findOne({ _id: req.params.userId }) // requires user _id in the URL params
          .populate({ path: 'thoughts', select: '-__v' }) // will populate the users thoughts
          .then((user) =>
            !user
              ? res.status(404).json({ message: 'No user with that ID' })
              : res.json(user)
          )
          .catch((err) => res.status(500).json(err));
      },
    createUser(req, res) { // creates a user
        User.create(req.body)
          .then((user) => res.json(user))
          .catch((err) => res.status(500).json(err));
      },
    updateUser(req, res) { // update a user
        User.findOneAndUpdate(
          { _id: req.params.userId },
          { $set: req.body }, // can change username and/or email 
          { runValidators: true, new: true }
        )
          .then((user) =>
            !user
              ? res.status(404).json({ message: 'No user with this id!' })
              : res.json(user)
          )
          .catch((err) => res.status(500).json(err));
      },
    deleteUser(req, res) { // deletes a user
        User.findOneAndDelete({ _id: req.params.userId })
        .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : Thought.deleteMany({ _id: { $in: user.thoughts } }) // deletes a user's thoughts along with the user
      )
      .then(() => res.json({ message: 'User and user\'s thoughts deleted!' }))
      .catch((err) => res.status(500).json(err));
  },
    addFriend(req, res) { // add a friend
        User.findOneAndUpdate(
            { _id: req.params.userId }, // needs user id in URL params
            { $addToSet: { friends: req.body } }, // needs friend's user id in the JSON body
            { runValidators: true, new: true }
          )
            .then((friend) =>
              !friend
                ? res
                    .status(404)
                    .json({ message: 'No friend found with that ID' })
                : res.json(friend)
            )
            .catch((err) => res.status(500).json(err));
        },
    removeFriend(req, res) {
        User.findOneAndUpdate( // it's not delete but friends can be removed this way
            { _id: req.params.userId }, // user id in URL params
            { $pull: { friends: req.params.friendId } }, // friend's id in URL params to be removed from friend list
            { runValidators: true, new: true }
          )
            .then((user) =>
              !user
                ? res
                    .status(404)
                    .json({ message: 'No friend found with that ID' })
                : res.json({ message: 'Removed friend!' })
            )
            .catch((err) => res.status(500).json(err));
        },
};