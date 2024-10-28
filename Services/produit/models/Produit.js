const mongoose = require('mongoose');

const produitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  isNewPro: {
    type: Boolean,
    default: false,
  },
  isHot: {
    type: Boolean,
    default: false,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
  },
});


const ProduitModel = mongoose.model('produit', produitSchema);
module.exports = ProduitModel;
