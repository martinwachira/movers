module.exports = (sequelize, Sequelize) => {
  const Booking = sequelize.define("bookings", {
    bookingDate: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    pickupTime: {
      type: Sequelize.TIME,
      allowNull: false,
    },
    pickupLocation: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    destination: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  return Booking;
};
