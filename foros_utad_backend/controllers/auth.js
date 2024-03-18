const { matchedData } = require("express-validator")
const { tokenSign } = require("../utils/handleJWT")
const { encrypt, compare } = require("../utils/handlePassword")
const {handleHttpError} = require("../utils/handleError")
const {usersModel} = require("../models")
const { hash } = require("bcryptjs")

const registerCtrl = async (req, res) => {
    try {
        req = matchedData(req)
        const password = await encrypt(req.password)
        const body = {...req, password} // Con "..." duplicamos el objeto y le añadimos o sobreescribimos una propiedad
        const dataUser = await usersModel.create(body)
        //Si no queremos que se devuelva el hash con "findOne", en el modelo de users ponemos select: false en el campo password
        //Además, en este caso con "create", debemos setear la propiedad tal que:  
        dataUser.set('password', undefined, { strict: false })

        const data = {
            token: await tokenSign(dataUser),
            user: dataUser
        }
        res.send(data)  
    }catch(err) {
        console.log(err)
        handleHttpError(res, "ERROR_REGISTER_USER")
    }
}



const loginCtrl = async (req, res) => {
    try {
        req = matchedData(req)
        const user = await usersModel.findOne({ email: req.email }).select("password name role email")
        console.log(user)
        if(!user){
            handleHttpError(res, "USER_NOT_EXISTS", 404)
            return
        }

        const hashPassword = user.password;
        console.log(hashPassword)
        console.log(req.password)
        console.log(user)

        if (hashPassword != req.password){
            handleHttpError(res, "INVALID_PASSWORD", 401)
            return
        }

        // Añadir token de sesion y comparar contraseñás hasheadas
        /*
        const check = await compare(req.password, hashPassword)
        if(!check){
            handleHttpError(res, "INVALID_PASSWORD", 401)
            return
        }

        //Si no quisiera devolver el hash del password
        user.set('password', undefined, {strict: false})
        const data = {
            token: await tokenSign(user),
            user
        }
        */

        res.send(user)

    }catch(err){
        console.log(err)
        handleHttpError(res, "ERROR_LOGIN_USER")
    }
}

module.exports = { registerCtrl, loginCtrl }
