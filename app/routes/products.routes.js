var express = require("express");
const db = require("../models");
const { authJwt } = require("../middleware");
const products_controller = require("../controllers/products.controller");


module.exports = function(app) {
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

  app.put(
    "/api/products/update/:id",
    // console.log(req.body.name),
    authJwt.verifyToken,
    products_controller.update
 
  );

  app.delete(
    "/api/products/:id",
    // console.log(req.body.name),
    authJwt.verifyToken,
    products_controller.delete
 
  )
};
