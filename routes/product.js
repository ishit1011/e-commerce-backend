const express = require('express');
const router = express.Router();
const product = require('../models/Product')

// Get All Products
router.get('/',async(req,res)=>{
    const allProducts = await product.find();
    res.json(allProducts);
})

// Get Single Product by ID
router.get('/:id',async(req,res)=>{
    const singleProduct = await product.findById(req.params.id);
    res.json(singleProduct);
})

module.exports = router;