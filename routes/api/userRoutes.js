const router = require('express').Router();
const {
  getusers,
  getSingleUser,
  createUser,
  deleteUser,
  updateUser,
  createFriend,
  removeFriend,
} = require('../../controllers/userController');

// /api/userss
router.route('/').get(getusers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post(createFriend).delete(removeFriend);

module.exports = router;
