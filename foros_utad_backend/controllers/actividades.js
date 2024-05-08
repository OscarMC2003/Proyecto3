/**
* Obtener lista de la base de datos
* @param {*} req
* @param {*} res
*/

const { actividadesModel } = require("../models")
const { usersModel } = require("../models")
const { matchedData } = require('express-validator')
const { handleHttpError } = require('../utils/handleError')
const { getId } = require("../controllers/users")

// COGER TODAS LAS ACTIVIDADES QUE EXISTEN 
const getItems = async (req, res) => {
    try{
        const data = await actividadesModel.find({})
        res.send(data)
    }catch (err){
        //Si nos sirve el de por defecto que hemos establecido, no es necesario pasar el 403
        handleHttpError(res, 'ERROR_GET_ITEMS_USERS', 403)
    }
        
}

// DEVUELVE CON ESE ID
const getItem = async (req, res) => {
    try{
        // MATCHED DATA PARA EL VALIDADOR Y COGE EL ID (QUE PASAMOS)
        const id = req.params.id;
        // LLAMADA AL MODELO Y FILTRA POR ID
        const data = await actividadesModel.findById(id)
        // SI LO ENCUENTRA MANDA DATOS DE ESE USUARIO, SI NO ERROR EN CATCH
        res.send(data)
    }catch (err){
        handleHttpError(res, 'ERROR_GET_ITEM_USERS', 403)
    }
        
}

// CREACIÓN
const createItem = async (req, res) => {
    try {
        // COGE INFO DE LA PETICION MANDADA, ESTA BIEN PQ ANTES HEMOS PASADO X EL VALIDADOR.
        const body = req.body
        console.log(body)
         //El dato filtrado por el modelo (probar con body=req)
        // VA AL MODEL Y CREA USER CON LA INFO PASADA
        const data = await actividadesModel.create(body)
        res.send(data)
    }catch(err){
        console.log(err)
        handleHttpError(res, 'ERROR_CREATE_ITEMS_CLASES')
    }
}

// ACTUALIZAR / CAMBIAR DATOS
const updateItem = async (req, res) => {
    try {
        const id = req.params._id
        const { ...body } = matchedData(req)

        const data = await actividadesModel.findOneAndUpdate({_id: id}, body, { new: true })

        res.send(data)
    }catch(err){
        handleHttpError(res, 'ERROR_UPDATING_ACTIVITY_INFO')
    }
}

// BORRAR
const deleteItem = async (req, res) => {
    try {
        // PILLA ID Y LO BORRA
        const id = req.url.substring(1); // hack de mierda porque el matchedData no le apetece leer de un delete
        console.log("borrando id " + id);
        const data = await actividadesModel.deleteOne({_id:id}); //borrado fisico
        //const data = await tracksModel.deleteOne({_id:id}); //borrado logico
        res.send(data)    
    }catch(err){
        handleHttpError(res, 'ERROR_DELETING_ACTIVITY')
    }
}

const addActivityUser = async (req, res) => {
    try {
        const userId = req.user._id;
        const { _id } = matchedData(req)

        const data = await usersModel.findOneAndUpdate(
            { _id: userId },
            { $push: { actividades: _id } },
            { new: true }
        );

        res.send(data);
    } catch (err) {
        handleHttpError(res, 'ERROR_ADDING_ACTIVITY_TO_USERS_PROFILE');
    }
};

module.exports = { getItems, getItem, createItem, updateItem, deleteItem, addActivityUser };
