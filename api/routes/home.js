const express = require('express');
const router = express.Router();

router.use('/products', require("./products"));
router.use('/orders', require('./orders'));

// Handling errors
router.use((req,res,next) => {
    const error = new Error('Not Found');
    error.status = 400;
    next(error);
})

// the next middleware to handle the error messages
router.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})

router.get('/', (req,res)=> {
    res.status(200).json({
        message: "Home GET Route",
        id: 1
    })
})

module.exports = router;