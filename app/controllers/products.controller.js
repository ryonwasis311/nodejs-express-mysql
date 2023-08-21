const db = require("../models");
const Products = db.products;

exports.create = async (req, res,next) => {
  // Save Products to Database
  try {
    const products = await Products.create({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      image: req.body.image,
    });
    await products.save();
    if (result) res.send({ message: "Products registered successfully!" });

  } catch (error) {
    res.status(500).send({ message: error.message });
    next(err);
  }
};
