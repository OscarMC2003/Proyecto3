/**
* Obtener lista de la base de datos
* @param {*} req
* @param {*} res
*/

const { forosModel } = require("../models")
const { matchedData } = require('express-validator')
const { handleHttpError } = require('../utils/handleError')

// COGER TODOS USERS QUE EXISTEN 
const getItems = async (req, res) => {
    try{
        const data = await forosModel.find({})
        res.send(data)
    }catch (err){
        //Si nos sirve el de por defecto que hemos establecido, no es necesario pasar el 403
        handleHttpError(res, 'ERROR_GET_ITEMS_USERS', 403)
    }
        
}

// DEVUELVE USUARIO CON ESE ID
const getItem = async (req, res) => {
    try{
        // MATCHED DATA PARA EL VALIDADOR Y COGE EL ID (QUE PASAMOS)
        const {id} = matchedData(req)
        // LLAMADA AL MODELO Y FILTRA POR ID
        const data = await forosModel.findById(id)
        // SI LO ENCUENTRA MANDA DATOS DE ESE USUARIO, SI NO ERROR EN CATCH
        res.send(data)
    }catch (err){
        handleHttpError(res, 'ERROR_GET_ITEM_USERS', 403)
    }
        
}

// CREACIÓN DE USUARIO
const createItem = async (req, res) => {
    try {
        // COGE INFO DE LA PETICION MANDADA, ESTA BIEN PQ ANTES HEMOS PASADO X EL VALIDADOR.
        const body = matchedData(req)
         //El dato filtrado por el modelo (probar con body=req)
        // VA AL MODEL Y CREA USER CON LA INFO PASADA
        const data = await forosModel.create(body)
        res.send(data)
    }catch(err){
        console.log(err)
        handleHttpError(res, 'ERROR_CREATE_ITEMS_CLASES')
    }
}

// AÑADIR MENSAJE
const createMessage = async (req, res) => {
    try {
        // Obtener el ID del foro al que se desea agregar el mensaje
        const { id } = req.params;
        // Obtener los datos del mensaje del cuerpo de la solicitud
        const mensajeData = req.body.mensaje;

        // Buscar el foro por su ID
        const foro = await forosModel.findById(id);
        if (!foro) {
            return res.status(404).json({ error: 'Foro no encontrado' });
        }

        // Agregar el mensaje al campo 'mensaje' del foro
        foro.mensaje.push(mensajeData);

        // Guardar los cambios en el foro
        await foro.save();

        // Enviar la respuesta con los datos del foro actualizados
        res.status(200).json(foro);
    }catch(err){
        console.log(err)
        handleHttpError(res, 'ERROR_CREATE_FORO_MESSAGE')
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
        const {id, ...body} = matchedData(req) //Extrae el id y el resto lo asigna a la constante body
        const data = await forosModel.findOneAndUpdate(id, body)
        res.send(data)
    }catch(err){
        handleHttpError(res, 'ERROR_UPDATE_ITEMS_USERS')
    }
}

// BORRAR USER
const deleteItem = async (req, res) => {
    try {
        // PILLA ID Y LO BORRA
        const {id} = matchedData(req)
        const data = await forosModel.delete({_id:id}); //borrado fisico
        //const data = await tracksModel.deleteOne({_id:id}); //borrado logico
        res.send(data)    
    }catch(err){
        handleHttpError(res, 'ERROR_DELETE_ITEM_USERS')
    }
}

module.exports = { getItems, getItem, createItem, createMessage, obtainMessage, updateItem, deleteItem };