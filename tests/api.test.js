const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ProductController = require('../controllers/productController');
const Product = require('../models/Product');

const app = express();
app.use(bodyParser.json());

app.post('/products', ProductController.createProduct);
app.get('/products/:id', ProductController.getProductById);
app.get('/products', ProductController.getAllProduct);
app.put('/products/:id', ProductController.updateProduct);
app.delete('/products/:id', ProductController.deleteProduct);

beforeAll(async () => {
    const url = 'mongodb+srv://papa:passer123@cluster0.1qaei.mongodb.net/products?retryWrites=true&w=majority&appName=Cluster0';
    await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
});

describe('Product Controller', () => {
    let productId;

    it('should create a new product', async () => {
        const response = await request(app)
            .post('/products')
            .send({
                createdAt: new Date(),
                name: 'Test Product',
                details: {
                    price: '100',
                    description: 'A test product',
                    color: 'Red'
                },
                stock: 10
            });

        expect(response.status).toBe(201);
        expect(response.body.name).toBe('Test Product');
        productId = response.body._id;
    });

    it('should get a product by ID', async () => {
        const response = await request(app).get(`/products/${productId}`);
        expect(response.status).toBe(200);
        expect(response.body.name).toBe('Test Product');
    });

    it('should get all products', async () => {
        const response = await request(app).get('/products');
        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    });

    it('should update a product', async () => {
        const response = await request(app)
            .put(`/products/${productId}`)
            .send({
                name: 'Updated Test Product',
                details: {
                    price: '200',
                    description: 'An updated test product',
                    color: 'Blue'
                },
                stock: 5
            });

        expect(response.status).toBe(200);
        expect(response.body.name).toBe('Updated Test Product');
    });

    it('should delete a product', async () => {
        const response = await request(app).delete(`/products/${productId}`);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Produit supprimé avec succès.');
    });
});
