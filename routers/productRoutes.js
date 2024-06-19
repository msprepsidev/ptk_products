const express = require('express')
const router = express.Router();
const productController = require ('../controllers/productController.js')
const { authenticateToken, authorizeRole } = require('../middleware/authMiddleware');

router.post('/product',authenticateToken, authorizeRole(['marketing']), productController.createProduct);
router.get('/products', authenticateToken, authorizeRole(['developper', 'customers', 'sales', 'marketing', 'management']),productController.getAllProduct);
router.get('/product/:id', authenticateToken, authorizeRole(['developper', 'customers', 'sales', 'marketing', 'management']), productController.getProductById);
router.put('/product/:id', authenticateToken, authorizeRole(['developper', 'customers', 'sales', 'marketing', 'management']), productController.updateProduct);
router.delete('/product/:id',authenticateToken, authorizeRole(['marketing']), productController.deleteProduct);

module.exports = router;