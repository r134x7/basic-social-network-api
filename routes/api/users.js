const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getSingleUser);
// .delete(deleteUser) to be added later
// .update(updateUser) to be added later

// /api/users/:userId/friends/
// router.route('/:userId/friends/).post(addFriend); // to be added later

// /api/users/:userId/friends/:friendId
// router.route('/:userId/friends/:friendId').delete(removeFriend); // to be added later

module.exports = router;
