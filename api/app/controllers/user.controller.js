const db = require("../models");
// const Role = require("../models/role.model.js");
const Role = db.role;

const User = db.user;
const Op = db.Sequelize.Op;

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content");
};

exports.staffBoard = (req, res) => {
  res.status(200).send("Staff Content");
};

// get all users
// exports.findAllUsers = (req, res) => {
//   const username = req.query.username;
//   var condition = username
//     ? { username: { [Op.iLike]: `%${username}%` } }
//     : null;

//   User.findAll({ where: condition })
//     .then((data) => {
//       res.send(data);
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: err.message || "Some error occurred while retrieving users.",
//       });
//     });
// };

//fetch all users together with their roles
exports.findAllUsers = (req, res) => {
  User.findAll({
    include: [
      {
        model: Role,
        attributes: ["name"],
        through: { attributes: [] },
      },
    ],
  })
    .then((users) => {
      // Extract user data and roles into a new array of objects
      const usersWithRoles = users.map((user) => {
        const roles = user.roles.map(
          (role) => role.name.charAt(0).toUpperCase() + role.name.slice(1)
        );
        return {
          id: user.id,
          username: user.username,
          email: user.email,
          password: user.password,
          verified: user.verified,
          createdAt: user.createdAt,
          roles: roles,
        };
      });

      res.status(200).send(usersWithRoles);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message && "Error occured while fetching users' roles",
      });
    });
};

// update user
exports.updateUser = (req, res) => {
  const userId = req.params.userId;

  User.update(
    {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      verified: req.body.verified,
    },
    {
      where: { id: userId },
    }
  )
    .then((num) => {
      if (num == 1) {
        // res.send({
        //   message: "User was updated successfully.",
        // });
        User.findByPk(userId).then((user) => {
          res.send({ user, message: "User was updated successfully" });
        });
      } else {
        res.send({
          message: `Cannot update user with id=${userId}. Maybe user was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating user with id=" + userId,
      });
    });
};
