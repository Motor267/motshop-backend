const express = require('express');
const router = express.Router();

const User = require('../models/User');

// Hash Contraseña
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.post('/new-user', async(req, res) => {

    const body = {
        name: req.body.name,
        email: req.body.email,
        city: req.body.city,
        line1: req.body.line1,
        line2: req.body.line2,
        numCard: '',
        expDate: '',
        codeCard: '',
    }

    body.pass = bcrypt.hashSync(req.body.pass, saltRounds);

    try {

        const userDB = await User.create(body);

        return res.json(userDB);

    } catch (error) {
        return res.status(500).json({
            mensaje: 'Ocurrio un error',
            error
        });
    }

});

router.put('/:id', async(req, res) => {

    let id = req.params.id;
    let body = req.body;

    if (body.pass) {
        body.pass = bcrypt.hashSync(req.body.pass, saltRounds);
    }

    try {
        // {new:true} devuelve el usuario actualizado
        const usuarioDB = await User.findByIdAndUpdate(id, body, { new: true });

        return res.json(usuarioDB);

    } catch (error) {
        return res.status(400).json({
            mensaje: 'Ocurrio un error',
            error
        })
    }

});


module.exports = router;