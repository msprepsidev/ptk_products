const express = require('express')
const router = express.Router();
const productController = require ('../controllers/productController.js')

router.post('/product', productController.createProduct);
router.get('/products', productController.getAllProduct);
router.get('/product/:id', productController.getProductById);
router.put('/product/:id', productController.updateProduct);
router.delete('/product/:id', productController.deleteProduct);

module.exports = router;