const express = require("express");
const router = express.Router();
const { Usuario } = require("../models"); 


const loginCtrl = async (req, res) =>{
    try {
        const { email, clave } = req.body; 

        const usuario = await Usuario.findOne({ where: { email } });

       
        if (!usuario) {
            return res.status(404).json({ error: 'El usuario no existe' });
        }

        if (usuario.clave !== clave) {
            return res.status(401).json({ error: 'Contraseña incorrecta' });
        }

        
        res.json({ mensaje: 'Inicio de sesión exitoso', usuario });

    } catch (error) {
        console.error('Error en el inicio de sesión:', error);
        res.status(500).json({ error: 'Error del servidor' });
    }
}

module.exports = { loginCtrl } ;
