const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

router.post('/', function(req, res, next) {
    let order = new Order({
        name: req.body.name,
        line1: req.body.line1,
        line2: req.body.line2,
        city: req.body.city,
        numCard: req.body.numCard,
        expDate: req.body.expDate,
        codeCard: req.body.codeCard,
        productsId: req.body.productsId
    });

    order.save();

    res.redirect('/');
});


module.exports = router;