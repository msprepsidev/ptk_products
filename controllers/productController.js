const Product = require( '../models/Product.js');
const amqp = require('amqplib/callback_api');
const config = require("../config/config.js")
const logger = require("../utils/logger.js")
require("dotenv").config()

function publishToQueue(queue, message) {
    amqp.connect('amqp://localhost' , function(error0, connection) {
        if (error0) {
            logger.error(`RabbitMQ connection error: ${error0}`);
            throw error0;
        }
        connection.createChannel(function(error1, channel) {
            if (error1) {
                logger.error(`RabbitMQ channel error: ${error1}`);
                throw error1;
            }
            channel.assertQueue(queue, { durable: false });
            channel.sendToQueue(queue, Buffer.from(message));
            logger.info(` [x] Sent ${message} to queue ${queue}`);
        });
        setTimeout(function() {
            connection.close();
        }, 500);
    });
}


const ProductController = {
    async createProduct(req, res) {
        console.log("===============================")
        // console.log(req)
        console.log(req.body)
        console.log("===============================")
        try {
            const newProductData = req.body;
            
            const newProduct = new Product(newProductData);
            await newProduct.save();
            publishToQueue('product_created', JSON.stringify(newProduct));
            res.status(201).json(newProduct);
        } catch (error) {
            logger.error(`Error creating product: ${error.message}`, { error, user: req.user });
            res.status(500).json({ message: 'Erreur lors de la création du nouveau produit.' });
        }
    },
    async getProductById(req, res) {
        try {
            const productId = req.params.id;
            console.log(`Recherche du client avec l'ID : ${productId}`);
            const product = await Product.findById(productId);

            if (!product) {
                logger.info(`Produit non trouvé`);
                return res.status(404).json({ message: 'Product non trouvé.' });
            }

            res.status(200).json(product);
        } catch (error) {
            logger.error(`Erreur lors de la récupération du produit : ${error}`);
            res.status(500).json({ message: 'Erreur lors de la recherche du produit.' });
        }
    },

    async getAllProduct(req, res) {
        try {
            const products = await Product.find();
            res.json(products);
        } catch (error) {
            logger.error(`Erreur lors de la récupération des produits : ${error}`);
            res.status(500).json({ message: 'Erreur lors de la récupération des produits' });
        }
    },

    async updateProduct(req, res){
        try {
            const productId = req.params.id;
            const productData = req.body;
            const updatedPr = await Product.findByIdAndUpdate(productId, productData, { new: true, runValidators: true });

            if (!updatedPr) {
                return res.status(404).json({ message: 'Produit non trouvé.' });
            }
            publishToQueue('product_updated', JSON.stringify(updatedPr));
            res.status(200).json(updatedPr);
        } catch (error) {
            res.status(500).json({ message: 'Erreur lors de la mise à jour du produit.' });
        }
    },

    async deleteProduct(req, res) {
        try {
            const productId = req.params.id;
            const deletedPr = await Product.findByIdAndDelete(productId);
            if (!deletedPr) {
                return res.status(404).json({ message: 'Product non trouvé.' });
            }
            publishToQueue('product_deleted', JSON.stringify(deletedPr));
            res.status(200).json({ message: 'Produit supprimé avec succès.' });
        } catch (error) {
            res.status(500).json({ message: 'Erreur lors de la suppression du produit.' });
        }
    }
}

module.exports = ProductController;