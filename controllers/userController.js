const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

module.exports = {
  //Get all users
  async getStudents(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  //Get a single user
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select('-__v');

      if (!user) {
        return res.status(404).json({ message: 'No user with this id' })
      }

      res.json({user});
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  //Create a new user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  
  //Update a user
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!user) {
        res.status(404).json({ message: 'No user with this id!' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //Delete a user and their thoughts
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.studentId });

      if (!user) {
        return res.status(404).json({ message: 'No user with this id!' });
      }

      //delete the thoughts
      await Thought.deleteMany({ username: { $in: user.username } });

      res.json({ message: 'User and associated thoughts successfully deleted' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  //Add auser to another user's friend list
  async createFriend(req, res) {
    try {
      const user = await Video.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: { friendId: req.params.friendId } } },
        { runValidators: true, new: true }
      )

      if (!user) {
        return res.status(404).json({ message: 'No user with this id!' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }

    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { assignments: req.body } },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: 'No user found with that ID :(' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //Remove user from a user's friend list
  async removeAssignment(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: { friendId: req.params.friendId } } },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: 'No user found with that id' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};