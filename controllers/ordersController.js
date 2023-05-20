const mongoose = require('mongoose');
const Order = require('../models/order');
const Product = require('../models/products');

module.exports.getOrders = function(req,res) {
    Order.find()
    .select('_id product quantity')
    .populate('product', '_id name price')
    .exec()
    .then(docs => {
        res.status(200).json({
            count: docs.length,
            orders: docs.map(doc => {
                return {
                    orderid: doc._id,
                    productDetails: doc.product,
                    quantity: doc.quantity
                }
            })
        })
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    })
}

module.exports.makeOrder = function(req,res) {
    Product.findById(req.body.productID)
    .then(product => {
        if(!product){
            res.status(404).json({
                mesagge: "Product Not found"
            })
        }
        const order = new Order({
            _id: new mongoose.Types.ObjectId(),
            quantity: req.body.quantity,
            product: req.body.productID
        })

        return order.save()
    })
    .then(result => {
        res.status(201).json({
            mesagge: "Order created",
            order: result
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    })
    
}

module.exports.getOrderByID = function(req,res) {
    Order.findById(req.params.orderid)
    .populate('product', '_id name price')
    .exec()
    .then(docs => {
        res.status(200).json({
            orders: docs.map(doc => {
                return {
                    orderid: doc._id,
                    productDetails: doc.product,
                    quantity: doc.quantity
                }
            })
        });
    })
    .catch(err => {
        res.status(404).json({
            message: "Order not found"
        })
    })
}

module.exports.deleteOrderByID = function(req,res) {
    const orderid = req.params.orderid
    Order.deleteOne({_id: orderid})
    .exec()
    .then(result => {
        if(!result){
            return res.status(404).json({
                message: "Order not found"
            })
        }
        res.status(200).json({
            message: "Order deleted"
        })
    })
    .catch(err => {
        res.status(500).json(err)
    })
}