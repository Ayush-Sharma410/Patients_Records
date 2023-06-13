const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
  {
    ID: { type: Number, required: true },
    first_name: {
      type: String,
      required: [true, 'Please enter your first name'],
    },
    last_name: {
      type: String,
      required: [true, 'Please enter your last name'],
    },
    age: {
      type: Number,
      required: true,
      default: 0,
    },
    diagnosis: {
      type: String,
      required: true,
    },
    Medicines_recommended: {
      type: String,
      required: true,
    },
    Doctor_Name: {
      type: String,
      required: true,
    },
    Hospital_Name: {
      type: String,
      required: true,
    },
    Date: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
