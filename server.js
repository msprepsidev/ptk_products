const express = require('express')
const mongoose = require('mongoose')
const productRoutes = require( './routers/productRoutes.js');
const config = require('./config/config.js')
const ProductController = require('./controllers/productController.js')

const app = express();
// app.use('/api', productRoutes);

mongoose.connect(config.mongoURI, { useUnifiedTopology: true })
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

app.listen(3001, () => {
  console.log('Server is running on port 3000');
});


app.post('/product', ProductController.createProduct);
app.get('/products/:id', ProductController.getProductById);
app.get('/products', ProductController.getAllProduct);
app.put('/products/:id', ProductController.updateProduct);
app.delete('/products/:id', ProductController.deleteProduct);


module.exports = app;
