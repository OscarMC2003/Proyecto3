const express = require("express");
const cors = require("cors");

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT_SERVER || 9000;

// Inicia la conexión a la base de datos y guarda la instancia de Sequelize en una variable
const sequelize = require('./config/sql');

// Una vez que la conexión se haya establecido, puedes iniciar tu servidor Express
sequelize.authenticate().then(() => {
    console.log('Conexión establecida correctamente con la base de datos.');
    app.listen(port, () => {
        console.log("Servidor escuchando en el puerto: " + port);
    });
}).catch(err => {
    console.error('Error al conectar a la base de datos:', err);
});

app.use("/api", require('./routes'));
app.use(express.static("storage"));


