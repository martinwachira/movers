const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.allAccess);

  app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);

  app.get(
    "/api/test/staff",
    [authJwt.verifyToken, authJwt.isStaff],
    controller.staffBoard
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );

  //get users and their roles
  app.get(
    "/api/test/getUsers",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.findAllUsers
  );

  // update user record
  app.put(
    "/api/test/updateUser/:userId",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.updateUser
  );

  //get roles
  // app.get(
  //   "/api/test/getRoles",
  //   [authJwt.verifyToken, authJwt.isAdmin],
  //   controller.findAllRoles
  // );
};
