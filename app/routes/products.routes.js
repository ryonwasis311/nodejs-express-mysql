var express = require("express");
const multer = require("multer");
const sharp = require("sharp");
const db = require("../models");
const { authJwt } = require("../middleware");
const products_controller = require("../controllers/products.controller");
const path = require("path");
const multerStorage = multer.diskStorage({
  destination:(req, file, cb) =>{
    cb(null, "./public/images/users");
  },
  filename: (req, file, cb) =>{
    console.log(path.extname(file.originalname))
    cb(null, `image-${Date.now()}` + path.extname(file.originalname));
  },
});

const multerFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(png|jpg|svg)$/)) {
    // upload only png and jpg format
    return cb(new Error("Image type not correct. png, jpg,svg"));
  }
  cb(null, true);
};

const upload =multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});


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
    upload.single("file"),
    products_controller.create
  );

  app.put(
    "/api/products/update/:id",
    // console.log(req.body.name),
    authJwt.verifyToken,
    upload.single("image"),
    products_controller.update
 
  );

  app.delete(
    "/api/products/:id",
    // console.log(req.body.name),
    authJwt.verifyToken,
    products_controller.delete
 
  )
};
