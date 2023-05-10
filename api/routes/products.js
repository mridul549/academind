const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
    res.status(200).json({
        message: "Handling GET requests in the products route"
    })
})

router.post('/', (req,res) => {
    const product = {
        name: req.body.name,
        price: req.body.price
    };
    res.status(201).json({
        message: "Handling POST requests in the products route",
        createdProduct: product
    })
})

router.get('/:productid', (req,res) => {
    const id = req.params.productid;
    if(id==='special'){
        res.status(200).json({
            message: "You discovered the special ID", 
            id: id
        })
    } else {
        res.status(200).json({
            message: "You passed an ID"
        })
    }
})

module.exports = router;