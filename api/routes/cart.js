const router = require('express').Router();
const Cart = require('../models/Cart');
const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization
} = require('./verifyToken');

// ------------ CREATE ----------------- //

router.post('/', verifyToken, async (req, res) => {
  const newCart = new Cart(req.body);
  try {
    const savedCart = await newCart.save();
    res.status(200).json(savedCart);
  } catch (error) {
    res.status(500).json(error);
  }
});

// ------------ END CREATE ----------------- //

// ------------ UPDATE ----------------- //

router.put('/:id', verifyTokenAndAuthorization, async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body
      },
      { new: true }
    );
    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json(error);
  }
});

// ------------ END OF UPDATE ----------------- //

// // ------------ DELETE ----------------- //

router.delete('/:id', verifyTokenAndAuthorization, async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json('Cart have been deleted');
  } catch (error) {
    res.status(500).json(err);
  }
});

// ------------ END OF DELETE ----------------- //

// ------------ GET USER CART ----------------- //

router.get('/find/:userId', verifyTokenAndAuthorization, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json(error);
  }
});

// ------------ END GET User CART ----------------- //

// ------------ GET ALL CART ----------------- //

router.get('/', verifyTokenAndAdmin, async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (error) {
    res.status(500).json(error);
  }
});

// ------------ END GET ALL CART ----------------- //

module.exports = router;
