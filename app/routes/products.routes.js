const { verifySignUp } = require("../middleware");
const products_controller = require("../controllers/products.controller");

module.exports = function(app) {

  app.post(
    "/api/products/create",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    products_controller.create
  );
};
