const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  try {
    // Save User to Database
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: await bcrypt.hashSync(req.body.password, 8),
      roles:
        req.body.roles && req.body.roles.length > 0
          ? req.body.roles
          : (req.body.roles = ["user"]),
    });

    if (req.body.roles && req.body.roles.length > 0) {
      const roles = await Role.findAll({
        where: {
          name: {
            [Op.or]: req.body.roles,
          },
        },
      });

      if (roles.length === 0) {
        res.status(400).send({
          message: "Cannot assign role to user: invalid role(s) provided",
        });
        return;
      }

      // const roleNames = roles.map((role) => role.name);

      await user.setRoles(roles);
      res.send({
        // message: `User registered successfully with assigned roles: ${[
        //   roleNames,
        // ]}`,
        message: `User registered successfully with assigned roles: ${req.body.roles}`,
      });
    } else {
      // await user.setRoles([user.roles]);
      await user.setRoles([1]);
      res.send({ message: "User registered successfully with default role" });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });

      var authorities = [];
      user.getRoles().then((roles) => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push(roles[i].name.toUpperCase());
        }
        res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
          roles: authorities,
          accessToken: token,
        });
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
