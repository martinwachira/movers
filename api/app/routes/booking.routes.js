const { authJwt } = require("../middleware");
const controller = require("../controllers/booking.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/test/createBooking",
    [authJwt.verifyToken],
    controller.createBooking
  );

  app.get(
    "/api/test/getBookings",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.findAllBookings
  );

  app.get(
    `/api/test/getBookings/:userId`,
    [authJwt.verifyToken],
    controller.findAllUserBookings
  );
};
