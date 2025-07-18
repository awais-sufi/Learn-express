const express = require("express");
const router = express.Router();

router.post("/register", (req, res) => {
  const { name, price } = req.body;
  res.json({
    message: "Product register successfully",
    product: {
      name,
      price,
    },
  });
});

router.get("/:id", (req, res) => {
  const productId = req.params.id;
  res.json(`Product ID ${productId}`);
});

module.exports = router;
