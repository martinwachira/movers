const db = require("../models");
// const Role = require("../models/role.model.js");
const Role = require("../models/role.model.js")(sequelize, Sequelize);

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
exports.findAllUsers = (req, res) => {
  const username = req.query.username;
  var condition = username
    ? { username: { [Op.iLike]: `%${username}%` } }
    : null;

  User.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users.",
      });
    });
};

// get roles
exports.findAllRoles = (req, res) => {
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
        const roles = user.roles.map((role) => role.name.toUpperCase());
        return {
          id: user.id,
          username: user.username,
          email: user.email,
          roles: roles,
        };
      });
      res.status(200).send(usersWithRoles);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
