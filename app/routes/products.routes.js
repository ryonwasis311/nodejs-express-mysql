const { verifySignUp, authJwt } = require("../middleware");
const products_controller = require("../controllers/products.controller");

module.exports = function(app) {

  app.post(
    "/api/products/create",
    authJwt.verifyToken,
    products_controller.create
  );
};
