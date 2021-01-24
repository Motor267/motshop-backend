const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: { type: String, required: [true, 'El nombre es necesario'] },
    email: { type: String, unique: true, required: [true, 'Email es necesario'] },
    pass: { type: String, required: [true, 'Pass es necesario'] },
    city: String,
    line1: String,
    line2: String,
    numCard: Number,
    expDate: String,
    codeCard: Number,
    activo: { type: Boolean, default: true }
});

// Convertir a modelo
module.exports = mongoose.model('User', UserSchema);