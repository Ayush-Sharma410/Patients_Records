const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/productModel');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes

app.get('/fetch', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/', (req, res) => {
  res.send('Hello NODE API');
});

app.get('/blog', (req, res) => {
  res.send('Hello Blog, My name is Ayush');
});

app.get('/products', async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/products/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const product = await Product.findOne({  ID: String(id) });
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  

app.post('/products', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// update a product
app.put('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findOneAndUpdate({ ID: id }, req.body);
    if (!product) {
      return res.status(404).json({ message: `Cannot find any product with ID ${id}` });
    }
    const updatedProduct = await Product.findOne({ ID: id });
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// delete a product
app.delete('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findOneAndDelete({ ID: id });
    if (!product) {
      return res.status(404).json({ message: `Cannot find any product with ID ${id}` });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

mongoose.set('strictQuery', false);

mongoose
  .connect('mongodb+srv://ayushsharma410:iamayush@cluster0.2xk7cm7.mongodb.net/Patients_Records?retryWrites=true&w=majority')
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(3000, () => {
      console.log('Node API app is running on port 3000');
    });
  })
  .catch((error) => {
    console.log(error);
  });
