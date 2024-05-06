/**
* Obtener lista de la base de datos
* @param {*} req
* @param {*} res
*/

const { forosModel } = require("../models")
const { matchedData } = require('express-validator')
const { handleHttpError } = require('../utils/handleError')

// COGER TODOS LOS FOROS 
const getItems = async (req, res) => {
    try{
        const data = await forosModel.find({})
        res.send(data)
    }catch (err){
        handleHttpError(res, 'ERROR_GETTING_FOROS', 403)
    }
        
}

// DEVUELVE FORO CON ESE ID
const getItem = async (req, res) => {
    try{
        const {id} = matchedData(req)

        const data = await forosModel.findById(id)

        res.send(data)
    }catch (err){
        handleHttpError(res, 'ERROR_GETTING_FORO', 403)
    }
        
}

// CREACIÓN DE FORO
const createItem = async (req, res) => {
    try {
        const body = matchedData(req)

        const data = await forosModel.create(body)

        res.send(data)
    }catch(err){
        console.log(err)
        handleHttpError(res, 'ERROR_CREATING_FORO')
    }
}

// AÑADIR MENSAJE
const createMessage = async (req, res) => {
    try {
        const { id } = req.params;
        const mensajeData = req.body.mensaje;
    
        const foro = await forosModel.findById(id);

        if (!foro) {
            handleHttpError(res, "FORO_NOT_FOUND", 404)
        }
        
        foro.mensaje.push(mensajeData);
        await foro.save();

        res.status(200).json(foro);
    }catch(err){
        console.log(err)
        handleHttpError(res, 'ERROR_POSTING_MESSAGE')
    }
}

//OBTENER MENSAJES
const obtainMessage = async (req, res) => {
    console.log("entrado")
    try {
        // ID del foro
        const { id } = req.params;
        console.log(id)
       
        // Buscar el foro por su ID
        const foro = await forosModel.findById(id);
        if (!foro) {
            return res.status(404).json({ error: 'Foro no encontrado' });
        }

        const mensajes = foro.mensaje;

        console.log(mensajes)

        // Enviar la respuesta con los datos del foro actualizados
        res.status(200).json(mensajes);
    }catch(err){
        console.log(err)
        handleHttpError(res, 'ERROR_OBTAINING_FORO_MESSAGES')
    }
}    

// ACTUALIZAR / CAMBIAR DATOS
const updateItem = async (req, res) => {
    try {
        const {id, ...body} = matchedData(req)
        const data = await forosModel.findOneAndUpdate({ _id: id }, body, { new: true })
        res.send(data)
    }catch(err){
        handleHttpError(res, 'ERROR_UPDATING_FORO_DATA')
    }
}

// BORRAR FORO
const deleteItem = async (req, res) => {
    try {
        const {id} = matchedData(req)
        const data = await forosModel.deleteOne({ _id: id });

        res.send(data)    
    }catch(err){
        handleHttpError(res, 'ERROR_DELETING_FORO')
    }
}

module.exports = { getItems, getItem, createItem, createMessage, obtainMessage, updateItem, deleteItem };