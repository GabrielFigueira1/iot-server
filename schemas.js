const mongoose = require('mongoose');

const tempSchema = new mongoose.Schema({
    temperature: Number,
    date: String,
    
}, { timestamps: true });

module.exports = {tempSchema};