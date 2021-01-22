const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    name: String,
    line1: String,
    line2: String,
    city: String,
    numCard: Number,
    expDate: String,
    codeCard: Number,
    productsId: [String]
});

module.exports = mongoose.model('Order', OrderSchema);