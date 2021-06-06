const { User } = require("../models");

// /api/users
const userController = {
//   GET all users
    getAllUsers(req, res) {
      User.find({})
      //   .populate({
      //     path: "thoughts",
      //   })
      //   .populate({
      //     path: "friends",
      //   })
        .sort({ _id: -1 })
        .then((dbUserData) => res.json(dbUserData))
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    },
  // get single user by id
//   getUserById(req, res) {
//     User.findOne({ _id: req.params.userId })
//       .select("-__v")
//       .populate("friends")
//       .populate("thoughts")
//       .then((dbUserData) => {
//         if (!dbUserData) {
//           return res.status(404).json({ message: "No user with this id!" });
//         }
//         res.json(dbUserData);
//       })
//       .catch((err) => {
//         console.log(err);
//         res.status(500).json(err);
//       });
//   },
    // GET single user by _id and populated thought and friend data
    getUserById({ params }, res) {
      User.findOne({ _id: params.userId })
        .select("-__v")
        .populate({
          path: "friends",
        })
        .populate({
            path: "thoughts",
        })
        .then((dbUserData) => {
          if (!dbUserData) {
            res.status(404).json({ message: "No user found with this id!" });
            return;
          }
          res.json(dbUserData);
        })
        .catch((err) => {
          console.log(err);
          res.status(400).json(err);
        });
    },
  //   POST new user
  createUser({ body }, res) {
    User.create(body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(400).json(err));
  },
  //   PUT to update user by _id
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.userId }, body, {
      new: true,
      runValidators: true,
    })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  },
  //   async
  //   DELETE to remove user by _id
  deleteUser({ params }, res) {
    //   await
    //   thought.DeleteMany({ userId: params.id }),
    User.findOneAndDelete({ _id: params.userId })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  },
  //   POST to add new friend to user's friend list
  addFriend({ params, body }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $push: { friends: params.friendId } },
      { new: true, runValidators: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },
  //   DELETE to remove friend from user's friend list
  removeFriend({ params }, res) {
    console.log("remove friend", params.friendId);
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } },
      { new: true }
    )
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.json(err));
  },
};

module.exports = userController;
