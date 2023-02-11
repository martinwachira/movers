module.exports = (sequelize, Sequelize) => {
  const customer = sequelize.define("customer", {
    cust_fullname: {
      type: Sequelize.STRING,
    },
    cust_address: {
      type: Sequelize.STRING,
    },
    cust_phonenumber: {
      type: Sequelize.STRING,
    },
    cust_location: {
      type: Sequelize.STRING,
    },
    cust_status: {
      type: Sequelize.BOOLEAN,
    },
  });

  return customer;
};
