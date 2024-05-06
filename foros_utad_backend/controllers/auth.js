const { matchedData } = require("express-validator");
const { tokenSign } = require("../utils/handleJWT");
const { compare, encrypt } = require("../utils/handlePassword");
const { handleHttpError } = require("../utils/handleError");
const { usersModel } = require("../models");
// const { hash } = require("bcryptjs")

const registerCtrl = async (req, res) => {
    try {
        req = matchedData(req);
        const password = await encrypt(req.password);
        const body = { ...req, password };

        const dataUser = await usersModel.create(body);
        dataUser.set('password', undefined, { strict: false });

        res.send(dataUser);
    } catch (err) {
        console.log(err);
        handleHttpError(res, "ERROR_REGISTERING_USER");
    }
}

const loginCtrl = async (req, res) => {
    try {
        req = matchedData(req);
        const user = await usersModel.findOne({ email: req.email }).select("password name role email");

        if (!user) {
            handleHttpError(res, "USER_NOT_EXISTS", 404);
            return;
        }

        const hashPassword = user.password;

        const passwordMatch = await compare(req.password, hashPassword);
        if (!passwordMatch) {
            handleHttpError(res, "INVALID_PASSWORD", 401);
            return;
        }

        dataUser.set('password', undefined, { strict: false });

        // Si las credenciales son válidas, genera el token JWT
        const token = await tokenSign(user);

        console.log("Token JWT generado:", token);
        console.log("Usuario autenticado:", user);

        // Envía el token JWT junto con el usuario en la respuesta
        res.json({ token, user });

    } catch (err) {
        console.log(err);
        handleHttpError(res, "ERROR_LOGIN_USER");
    }
};

module.exports = { registerCtrl, loginCtrl };
