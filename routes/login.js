const express = require('express');
const router = express.Router();

const User = require('../models/User');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

router.post('/', async(req, res) => {

    let body = req.body;

    try {
        // Buscamos email en DB
        const usuarioDB = await User.findOne({ email: body.email });

        // Evaluamos si existe el usuario en DB
        if (!usuarioDB) {
            return res.status(400).json({
                mensaje: 'Usuario o contraseña inválidos',
            });
        }

        // Evaluamos la contraseña correcta
        if (!bcrypt.compareSync(body.pass, usuarioDB.pass)) {
            return res.status(400).json({
                mensaje: 'Usuario o contraseña inválidos',
            });
        }

        // Generar Token
        let token = jwt.sign({
                data: usuarioDB
            }, 'secret', { expiresIn: 60 * 60 * 24 * 30 }) // Expira en 30 días

        // Pasó las validaciones
        return res.json({
            usuarioDB,
            token: token
        })

    } catch (error) {
        return res.status(400).json({
            mensaje: 'Ocurrio un error',
            error
        });
    }

});


module.exports = router;