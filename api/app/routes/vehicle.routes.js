const { authJwt } = require("../middleware");
const controller = require("../controllers/vehicle.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/test/createVehicle",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.createVehicle
  );

  app.get(
    "/api/test/getVehicles",
    [authJwt.verifyToken],
    controller.findAllVehicles
  );
};
