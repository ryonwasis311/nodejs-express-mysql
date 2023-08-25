const db = require("../models");
const Products = db.products;

//Create and Save a new Product
exports.create = (req, res) => {
  const products = new Products({
    title: req.body.title,
    description: req.body.description,
    image: req.file.filename,
    price: req.body.price,
    owner: req.userId,
  });
  products.save();
  res.json(products);
};

exports.get = async (req, res) => {
  const products = await Products.findAll();
  if (!products) {
    return res.status(400).json({ msg: "There is no Product" });
  }

  res.json(products);
  console.log("Too many products");
};

//Update a product by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Products.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Products was update successfully",
        });
      } else {
        res.send({
          message: `Cannot update products with id=${id} . Maybe product was not found or req.body is empty`,
        });
      }
    })

    .catch((err) => {
      res.status(500).send({
        message: "Error updating Product with id=" + id,
      });
    });
};

//Delete a product with the specified id in the request
exports.delete = async (req, res) => {
  const id = req.params.id;
  try {
    const productFound = await Products.destroy({
      where: { id: id },
      truncate: false,
    });
    if (!productFound) return res.status(204).json();
    return res.status(200).json({ msg: "successful operation" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error");
  }
};

//Delete all products in the request
exports.deleteAll = (req, res) => {
  Products.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Products were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Products.",
      });
    });
};
