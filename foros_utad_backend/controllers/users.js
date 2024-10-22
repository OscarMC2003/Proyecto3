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
        //const {id} = matchedData(req)
        const id = req.params.id
        console.log(id)
        // LLAMADA AL MODELO Y FILTRA POR ID
        const data = await usersModel.findById(id, { password: 0 })
        console.log(data)
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
        const id = req.params.id
        const body = req.body
        
        const password = await encrypt(body.password)
        
        console.log(password)
        
        // const data = await usersModel.findOneAndUpdate({_id: id}, body, {new: true})
        const data = await usersModel.findOneAndUpdate({_id: id}, {password: password})
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

// ADD ACTIVIDADES A USUARIOS




// ADD FOROS A USUARIOS

module.exports = { getItems, getItem, createItem, updateItem, deleteItem, getId };