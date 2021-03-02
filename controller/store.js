const express = require("express");
const router = express.Router();
const Product = require("../models/products.js");

// seed route
/* router.get("/seed", async (req, res) => {
  const newProducts = [
    {
      name: "Beans",
      description:
        "A small pile of beans. Buy more beans for a big pile of beans.",
      img:
        "https://cdn3.bigcommerce.com/s-a6pgxdjc7w/products/1075/images/967/416130__50605.1467418920.1280.1280.jpg?c=2",
      price: 5,
      qty: 99,
    },
    {
      name: "Bones",
      description: "It's just a bag of bones.",
      img: "http://bluelips.com/prod_images_large/bones1.jpg",
      price: 25,
      qty: 0,
    },
    {
      name: "Bins",
      description: "A stack of colorful bins for your beans and bones.",
      img: "http://www.clipartbest.com/cliparts/9cz/rMM/9czrMMBcE.jpeg",
      price: 7000,
      qty: 1,
    },
  ];

  try {
    const seedItems = await Product.create(newProducts);
    res.send(seedItems);
  } catch (err) {
    res.send(err.message);
  }
}); */

// Index route
router.get("/", (req, res) => {
  Product.find({}, (err, allProduct) => {
    if (err) console.error(err.message);
    else {
      res.render("index.ejs", { product: allProduct });
    }
  });
});

// New route
router.get("/new", (req, res) => {
  res.render("new.ejs");
});

// Show route
router.get("/:id", (req, res) => {
  Product.findById(req.params.id, (err, foundProduct) => {
    if (err) res.send(err.message);

    res.render("show.ejs", {
      product: foundProduct,
    });
  });
});

// Edit route
router.get("/:id/edit", (req, res) => {
  Product.findById(req.params.id, (err, foundProduct) => {
    res.render("edit.ejs", {
      product: foundProduct,
    });
  });
});

// Delete route
router.delete("/:id", (req, res) => {
  Product.findByIdAndRemove(req.params.id, (err, data) => {
    res.redirect("/store");
  });
});

// Update route
router.put("/:id", (req, res) => {
  Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, updatedModel) => {
      res.redirect("/store");
    }
  );
});

// update on purchase
router.post("/:id", (req, res) => {
  Product.findByIdAndUpdate(
    req.params.id,
    { $inc: { qty: -1 } },
    { new: true },
    (err, updatedModel) => {
      if (err) console.log(err.message);
      else {
        res.redirect("/store/" + req.params.id);
      }
    }
  );
});

// Create route
router.post("/", (req, res) => {
  Product.create(req.body, (err, addedProduct) => {
    if (err) res.send(err.message);

    res.redirect("/store");
  });
});

module.exports = router;
