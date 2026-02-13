const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imagePath: {
        type: String
    },
    icon: {
        type: String // Optional: font awesome class or similar
    },
    isActive: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('Service', serviceSchema);
