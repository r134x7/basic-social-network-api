const { Thought, User } = require('../models');

module.exports = {
    getUsers(req, res) {
        User.find()
        .then((user) => res.json(user))
        .catch((err) => {
            console.error({message: err});
            return res.status(500).json(err);
        });
    },
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
          .then((user) =>
            !user
              ? res.status(404).json({ message: 'No user with that ID' })
              : res.json(user)
          )
          .catch((err) => res.status(500).json(err));
      },
    createUser(req, res) {
        User.create(req.body)
          .then((user) => res.json(user))
          .catch((err) => res.status(500).json(err));
      },
    //need update user: find one and update
    // need delete user
    // need to remove user's associated users when user is deleted
    //need to:
    // /api/users/:userId/friends/:friendId
    // post and delete needs to be made
};