const Product = require( '../models/Product.js');

const ProductController = {
    async createProduct(req, res) {
        try {
            const newProductData = req.body;
            const newProduct = new Customer(newProductData);
            await newProduct.save();
            res.status(201).json(newProduct);
        } catch (error) {
            res.status(500).json({ message: 'Erreur lors de la création du nouveau produit.' });
        }
    },
    async getProductById(req, res) {
        try {
            const productId = req.params.id;
            console.log(`Recherche du client avec l'ID : ${productId}`);
            const product = await Product.findById(productId);

            if (!product) {
                return res.status(404).json({ message: 'Product non trouvé.' });
            }

            res.status(200).json(product);
        } catch (error) {
            res.status(500).json({ message: 'Erreur lors de la recherche du produit.' });
        }
    },

    async getAllProduct(req, res) {
        try {
            const products = await Product.find();
            res.json(products);
        } catch (error) {
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

            res.status(200).json(updatedPr);
        } catch (error) {
            res.status(500).json({ message: 'Erreur lors de la mise à jour du produit.' });
        }
    },

    async deleteProduct(req, res) {
        try {
            const deletedPr = await Product.findOneAndDelete({ id: req.params.id });
            if (!deletedPr) {
                return res.status(404).json({ message: 'Product non trouvé.' });
            }
            res.json({ message: 'Produit supprimé avec succès.' });
        } catch (error) {
            res.status(500).json({ message: 'Erreur lors de la suppression du produit.' });
        }
    }
}

module.exports = ProductController;