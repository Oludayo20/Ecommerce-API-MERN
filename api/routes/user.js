const router = require('express').Router();
const User = require('../models/User');
const {
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization
} = require('./verifyToken');

// ------------ UPDATE ----------------- //
router.put('/:id', verifyTokenAndAuthorization, async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SECRET
    ).toString();
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

// ------------ END OF UPDATE ----------------- //

// ------------ DELETE ----------------- //

router.delete('/:id', verifyTokenAndAuthorization, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json('User have been deleted');
  } catch (error) {
    res.status(500).json(error);
  }
});

// ------------ END OF DELETE ----------------- //

// ------------ GET USER ----------------- //

router.get('/find/:id', verifyTokenAndAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(500).json(others);
  } catch (error) {
    res.status(500).json(error);
  }
});

// ------------ END GET USER ----------------- //

// ------------ GET ALL USER ----------------- //

router.get('/findAllUsers', verifyTokenAndAdmin, async (req, res) => {
  const query = req.query.new;
  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find();
    res.status(500).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
});

// ------------ END GET ALL USER ----------------- //

// ------------ GET USER STATS ----------------- //

router.get('/stats', verifyTokenAndAdmin, async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: '$createdAt' }
        }
      },
      {
        $group: {
          _id: '$month',
          total: { $sum: 1 }
        }
      }
    ]);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
});

// ------------ END OF GET USER STATS ----------------- //

module.exports = router;
