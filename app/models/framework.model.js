const mongoose = require('mongoose');

const FrameworkSchema = mongoose.Schema({
    name: String,
    type: String,
    description: String
    
});

module.exports = mongoose.model('Framework', FrameworkSchema);