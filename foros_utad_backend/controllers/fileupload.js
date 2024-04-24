const { fileuploadModel } = require("../models")
const { matchedData } = require('express-validator')
const { handleHttpError } = require('../utils/handleError')

const getItem = async (req, res) => {
    try{
        const id = req.params.id;
        const data = await fileuploadModel.findById(id);
        res.send(data.data); //TODO: decodificar el base64
        //Buffer.from(data.data, 'base64').toString('binary')
    }catch (err){
        handleHttpError(res, 'ERROR_GET_ITEM_FILE', 403);
    }
}

const createItem = async (req, res) => {
    try {
        //const body = matchedData(req);
        //const filename
        //Buffer.from(matchedData(req)).toString('base64')
        const data = await fileuploadModel.create(body);
        res.send(data);
    }catch(err){
        console.log(err);
        handleHttpError(res, 'ERROR_CREATE_ITEM_FILE');
    }
}

const deleteItem = async (req, res) => {
    try {
        const {id} = matchedData(req);
        const data = await fileuploadModel.delete({_id:id});
        res.send(data);   
    }catch(err){
        handleHttpError(res, 'ERROR_DELETE_ITEM_FILE');
    }
}

module.exports = { getItem, createItem, deleteItem };
