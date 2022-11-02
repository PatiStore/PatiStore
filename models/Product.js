const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        title:
        {
            type: String,
            required: true,
            unique: true
        },
        album_name:
        {
            type: String
        },
        genre:
        {
            type: Array,
            required: true
        },
        realese_date:
        {
            type: Date,
            required: true
        },
        artist:
        {
            type: Array,
            required: true
        },
        img:
        {
            type: String,
            required: true,
        },
        price:
        {
            type: Number,
            required: true,
        },
    },
    {timestamps: true}
);

module.exports = mongoose.model('Product', productSchema);