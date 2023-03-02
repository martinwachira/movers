module.exports = (sequelize, Sequelize) => {
  const Vehicle = sequelize.define("vehicles", {
    vtype: {
      type: Sequelize.STRING,
    },
    vmake: {
      type: Sequelize.STRING,
    },
    vmileage: {
      type: Sequelize.FLOAT,
    },
    vlocation: {
      type: Sequelize.STRING,
    },
    vcapacity: {
      type: Sequelize.STRING,
    },
  });

  return Vehicle;
};
