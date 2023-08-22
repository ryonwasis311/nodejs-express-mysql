const db = require("../models");
const Products = db.products;

exports.create = (req, res) => {
  const products = new Products({
    title: req.body.title,
    description: req.body.description,
    image: req.body.image,
    price: req.body.price
  });
  products.save();
  res.json(products);

};
