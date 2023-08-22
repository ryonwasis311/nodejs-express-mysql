const db = require("../models");
const Products = db.products;

exports.create = (req, res) => {
  const products = new Products({
    title: req.body.title,
    description: req.body.description,
    image: req.body.image,
    price: req.body.price,
  });
  products.save();
  res.json(products);
};

exports.get = (req, res) => {
  const products =Products.findAll();
  if (!products) {
    return res.status(400).json({ msg: "There is no Product" });
  }

  res.json(products);
  console.log("Too many products");
};

exports.update = async (req, res) => {
  if (req.file) {
    const products = await Products.findByPk(req.body._id, {
      title: req.body.title,
      description: req.body.description,
      image: req.body.image,
      price: req.body.price,
    });
    console.log(products);
    products.save();
    res.json(products);
  } else {
    const products = await Products.findByPk(req.body._id, {
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
    });
    console.log(req.body);
    res.json(products);
  }
};
