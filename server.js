const express = require('express')
const mongoose = require('mongoose')

const productRoutes = require( './routers/productRoutes.js');
const ProductController = require ('./controllers/productController.js')
const Product = require ('./models/Product.js')

const app = express();
app.use('/api', productRoutes);
const url = 'mongodb+srv://papa:passer123@cluster0.1qaei.mongodb.net/customers?retryWrites=true&w=majority&appName=Cluster0';
function connect(){
  try{
      mongoose.connect(url, {
          useNewUrlParser: true,
          useUnifiedTopology: true
      });
      console.log('Connected to the database');
  }
  catch(err){
      console.log(err);
  }
}
connect();

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

app.get('/products', ProductController.getAllProduct)
app.post('/product', ProductController.createProduct)

module.exports = app;
