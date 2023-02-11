module.exports = (sequelize, Sequelize) => {
  const vehicle = sequelize.define("vehicle", {
    vehicle_reg: {
      type: Sequelize.STRING,
    },
    vehicle_type: {
      type: Sequelize.STRING,
    },
    vehicle_capacity: {
      type: Sequelize.STRING,
    },
    vehicle_mileage: {
      type: Sequelize.STRING,
    },
    vehicle_location: {
      type: Sequelize.STRING,
    },
  });

  return vehicle;
};
