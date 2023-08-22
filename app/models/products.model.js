module.exports = (sequelize, Sequelize) => {
  const Products = sequelize.define("products", {
    title: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    price: {
      type: Sequelize.STRING,
    },
    image: {
      type: Sequelize.STRING,
    }

  });

  return Products;
};
