const router = require('express').Router();
const Product = require('../models/Product');
const {
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization
} = require('./verifyToken');

// ------------ CREATE ----------------- //

router.post('/', verifyTokenAndAdmin, async (req, res) => {
  const newProduct = new Product(req.body);
  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (error) {
    res.status(500).json(error);
  }
});

// ------------ END CREATE ----------------- //

// ------------ UPDATE ----------------- //

router.put('/:id', verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json(error);
  }
});

// ------------ END OF UPDATE ----------------- //

// // ------------ DELETE ----------------- //

router.delete('/:id', verifyTokenAndAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json('Product have been deleted');
  } catch (error) {
    res.status(500).json(err);
  }
});

// ------------ END OF DELETE ----------------- //

// ------------ GET PRODUCT ----------------- //

router.get('/find/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
});

// // ------------ END GET PRODUCT ----------------- //

// // ------------ GET ALL PRODUCT ----------------- //

router.get('/', verifyTokenAndAdmin, async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let products;
    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(1);
    } else if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory]
        }
      });
    } else {
      products = await Product.find();
    }
    res.status(500).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
});

// // ------------ END GET ALL USER ----------------- //

module.exports = router;
