const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    createdAt: { 
        type: Date, 
        required: true 
    },
    name: { 
        type: String, 
        required: true 
    },
    details: {
        price: { 
            type: String, 
            required: true 
        },
        description: { 
            type: String, 
            required: true 
        },
        color: { 
            type: String, 
            required: true 
        }
    },
    stock: { 
        type: Number, 
        required: true 
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;