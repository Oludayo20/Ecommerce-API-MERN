const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');
const productRoute = require('./routes/product');
const cartRoute = require('./routes/cart');
const orderRoute = require('./routes/order');
const paymentRoute = require('./routes/stripe');
var cors = require('cors');

app.use(cors()); // Use this after the variable declaration

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log('DB connection Successful!!'))
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use('/api/v1/users', userRoute);
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/products', productRoute);
app.use('/api/v1/carts', cartRoute);
app.use('/api/v1/orders', orderRoute);
app.use('/api/v1/checkout', paymentRoute);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Backend Server is running at port: ${port}`);
});
