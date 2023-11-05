const { User, Thought } = require('../models');

module.exports = {
  //Get all users
  async getUsers(req, res) {
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
      const user = await User.findOne({ _id: req.params.userId });

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
      console.log(req.params.userId);
      console.log(req.body);
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!user) {
        res.status(404).json({ message: 'No user with this id' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //Delete a user and their thoughts
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: 'No user with this id!' });
      }

      //delete the thoughts
      await Thought.deleteMany({ _id: { $in: user.thoughts } });

      res.json({ message: 'User and their thoughts successfully deleted' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  //Add auser to another user's friend list
  async createFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: { _id: req.params.friendId } } },
        { runValidators: true, new: true }
      )

      if (!user) {
        return res.status(404).json({ message: 'No user with this id!' });
      }
      
      const user2 = await User.findOneAndUpdate(
        { _id: req.params.friendId },
        { $addToSet: { friends: { _id: req.params.userId } } },
        { runValidators: true, new: true }
      )

      if (!user2) {
        return res.status(404).json({ message: 'No user with this id!' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //Remove user from a user's friend list
  async removeFriend(req, res) {
    try {
      console.log(req.params.userId);
      console.log(req.params.friendId);
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res.status(404).json({ message: 'No user found with that id' });
      }
      
      const user2 = await User.findOneAndUpdate(
        { _id: req.params.friendId },
        { $pull: { friends: req.params.userId } },
        { runValidators: true, new: true }
      );

      if (!user2) {
        return res.status(404).json({ message: 'No user found with that id' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
