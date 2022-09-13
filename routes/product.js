const router = require("express").Router();
const Product = require("../model/product");

/* ADD PRODUCT */
router.post("/addproduct", async (req, res) => {
  const newProduct = new Product({
    name: req.body.name,
    price: req.body.price,
  });
  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

/* GET ALL PRODUCTS */
router.get("/allproducts", async (res) => {
  try {
    const result = await Product.find({});
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

/* UPDATE A PRODUCT */
router.put("/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.findOneAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

/* DELETE A PRODUCT */
router.delete("/:id", async (req, res) => {
  try {
    await Product.findOneAndDelete(req.params.id);
    res.status(200).json("The product has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
