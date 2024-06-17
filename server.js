const express = require('express')
const mongoose = require('mongoose')
const productRoutes = require( './routers/productRoutes.js');
const config = require('./config/config.js')
const ProductController = require('./controllers/productController.js')

const app = express();
app.use(express.json());
app.use('/api', productRoutes);

mongoose.connect(config.mongoURI, { useUnifiedTopology: true })
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

app.listen(3001, () => {
  console.log('Server is running on port 3000');
});



module.exports = app;
