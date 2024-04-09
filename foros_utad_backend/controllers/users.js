/**
* Obtener lista de la base de datos
* @param {*} req
* @param {*} res
*/

const { usersModel } = require("../models")
const { matchedData } = require('express-validator')
const { handleHttpError } = require('../utils/handleError')
const { compare, encrypt } = require("../utils/handlePassword");

// COGER TODOS USERS QUE EXISTEN 
const getItems = async (req, res) => {
    try{
        const data = await usersModel.find({})
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
        const data = await usersModel.findById(id)
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
        const data = await usersModel.create(body)
        res.send(data)
    }catch(err){
        console.log(err)
        handleHttpError(res, 'ERROR_CREATE_ITEMS_USERS')
    }
}


// ACTUALIZAR / CAMBIAR DATOS
const updateItem = async (req, res) => {
    try {
        const email = Buffer.from(req.params.email, 'base64').toString('utf-8'); //Decodifica el email
        console.log(email)
        const body = req.body; //Obtiene el cuerpo de la solicitud
        console.log(body)
        console.log(body.password);
        const passwordCrypt = await encrypt(body.password);
        console.log(passwordCrypt) // Imprime la contraseña cifrada
        body.password = passwordCrypt;
        const user = await usersModel.findOne({email: email}); //Busca por email

        if (!user) {
            return res.status(404).send({error: 'Usuario no encontrado'});
        }

        const data = await usersModel.findOneAndUpdate({email: email}, body, {new: true}) //Actualiza
        res.send(data)
    } catch(err) {
        console.error(err);
        handleHttpError(res, 'ERROR_UPDATE_ITEMS_USERS')
    }
}

// BORRAR USER
const deleteItem = async (req, res) => {
    try {
        // PILLA ID Y LO BORRA
        const {id} = matchedData(req)
        const data = await usersModel.delete({_id:id}); //borrado fisico
        //const data = await tracksModel.deleteOne({_id:id}); //borrado logico
        res.send(data)    
    }catch(err){
        handleHttpError(res, 'ERROR_DELETE_ITEM_USERS')
    }
}

const getId = async (req, res) => {
    res.json({ id: req.user._id });
}


module.exports = { getItems, getItem, createItem, updateItem, deleteItem, getId };