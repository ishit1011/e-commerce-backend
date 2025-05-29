const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  variants: [
    {
      color: String,
      size: String,
      price: Number,
    },
  ],
  imageUrl: String,
});

module.exports = mongoose.model('Product',productSchema);
