require('dotenv').config();
const mysql = require('serverless-mysql');

const db = mysql({
    config: {
        host: process.env.HOST_DB,
        port: process.env.PORT_DB,
        database: process.env.DATABASE,
        user: process.env.USER_DB,
        password: process.env.PASSWORD_DB
    }
});

 const dbConnect = async () => {
    await db.connect()
    console.log('Conexión a la base de datos establecida exitosamente');
}


module.exports = { db, dbConnect } ;
