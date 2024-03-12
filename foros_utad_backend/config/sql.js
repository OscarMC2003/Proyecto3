require('dotenv').config(); // Carga las variables de entorno desde .env
const Sequelize = require('sequelize');

// Configuración de la conexión a la base de datos utilizando las variables de entorno
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql', // Especifica el dialecto de la base de datos (en este caso, MySQL)
  // Puedes agregar más opciones de configuración aquí, como puerto, pool de conexiones, etc.
});

// Exporta la instancia de Sequelize para que pueda ser utilizada en otros archivos
module.exports = sequelize;
