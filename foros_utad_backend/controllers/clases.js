/**
* Obtener lista de la base de datos
* @param {*} req
* @param {*} res
*/

const { clasesModel } = require("../models")
const { matchedData } = require('express-validator')
const { handleHttpError } = require('../utils/handleError')

// DEVUELVE TODAS LAS CLASES
const getItems = async (req, res) => {
    try{
        const data = await clasesModel.find({})
        res.send(data)
    }catch (err){
        //Si nos sirve el de por defecto que hemos establecido, no es necesario pasar el 403
        handleHttpError(res, 'ERROR_GET_ITEMS_USERS', 403)
    }
        
}

// DEVUELVE CLASE CON UN ID ESPECÍFICO
const getItem = async (req, res) => {
    try{
        const {id} = matchedData(req)
    
        const data = await clasesModel.findById(id)
        
        res.send(data)
    } catch (err){
        handleHttpError(res, 'ERROR_GETTING_CLASSROOM', 403)
    }
        
}

// CREA UNA NUEVA CLASE
const createItem = async (req, res) => {
    try {
        const body = matchedData(req)
        const data = await clasesModel.create(body)
        
        res.send(data)
    } catch(err){
        console.log(err)
        handleHttpError(res, 'ERROR_CREATING_NEW_CLASSROOM')
    }
}

// ACTUALIZAR / CAMBIAR DATOS DE LA CLASE
const updateItem = async (req, res) => {
    try {
        const {id, ...body} = matchedData(req)

        const data = await clasesModel.findOneAndUpdate({_id: id }, body, { new: true })

        res.send(data)
    } catch(err){
        handleHttpError(res, 'ERROR_UPDATING_CLASSROOM')
    }
}

// BORRAR CLASE
const deleteItem = async (req, res) => {
    try {
        const {id} = matchedData(req)
        const data = await clasesModel.deleteOne({_id:id});

        res.send(data)    
    } catch(err){
        handleHttpError(res, 'ERROR_DELETING_CLASSROOM')
    }
}

module.exports = { getItems, getItem, createItem, updateItem, deleteItem };