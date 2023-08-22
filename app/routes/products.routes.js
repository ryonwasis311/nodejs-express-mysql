var express = require("express");
const db = require("../models");
const { verifySignUp, authJwt } = require("../middleware");
const products_controller = require("../controllers/products.controller");
const Products = db.products;
const router = express.Router();


module.exports = function(app) {
  router.get("/products", authJwt.verifyToken, async (req, res) => {
    try {
      const products = await Products.findAll();
      if (!products) {
        return res.status(400).json({ msg: "There is no Product" });
      }
  
      res.json(products);
      console.log("Too many products")
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });

  app.get(
    "/api/products",
    // console.log(req.body.name),
    authJwt.verifyToken,
    products_controller.get
 
  );

  app.post(
    "/api/products/create",
    authJwt.verifyToken,
    products_controller.create
  );

  app.post(
    "/api/products/update",
    // console.log(req.body.name),
    authJwt.verifyToken,
    products_controller.update
 
  );
};
