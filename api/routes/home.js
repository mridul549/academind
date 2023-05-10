const express = require('express');
const router = express.Router();

router.use('/products', require("./products"));
router.use('/orders', require('./orders'));

router.get('/', (req,res)=> {
    res.status(200).json({
        message: "Sanyam chutiya hai, Mridul is the best",
        id: 1
    })
})

module.exports = router;