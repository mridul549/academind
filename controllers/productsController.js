const Product = require('../models/products')
const mongoose = require('mongoose');

module.exports.homeGet = function(req,res) {
    Product.find()
    .exec()
    .then(docs => {
        res.status(200).json(docs);
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    })
}

module.exports.homePost = function(req,res) {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    product
    .save()
    .then(result => {
        res.status(201).json({
            message: "Product added successfully",
            createdProduct: result
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
}

module.exports.getProductId = function(req, res) {
    const id = req.params.productid;
    Product.findById(id)
    .exec()
    .then(doc => {
        if(doc) {
            res.status(200).json(doc);
        } else {
            res.status(404).json({message: "No valid entry found for the requested id"});
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
}

module.exports.deleteProductByID = function(req,res) {
    const id = req.params.productId;
    Product.deleteOne({_id: id})
    .exec()
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
}

module.exports.patchProductByID = function(req,res) {
    const id = req.params.productId;
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    Product.updateOne({_id: id}, {
        $set: updateOps
    })
    .exec()
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
}