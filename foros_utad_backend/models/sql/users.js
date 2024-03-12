const { DataTypes } = require('sequelize');
const sequelize = require('../../config/sql'); // Asegúrate de que esta ruta sea correcta según la ubicación de tu archivo de configuración de Sequelize

const Usuario = sequelize.define('usuario', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  activo: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  clave: {
    type: DataTypes.STRING(25),
    allowNull: false
  },
  token_recuerdo: {
    type: DataTypes.STRING(100),
    defaultValue: null
  },
  creado_en: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  actualizado_en: {
    type: DataTypes.DATE,
    defaultValue: null
  },
  avatar_url: {
    type: DataTypes.STRING(100),
    defaultValue: null
  },
  ultimo_acceso: {
    type: DataTypes.DATE,
    defaultValue: null
  }
}, {
  tableName: 'usuarios', // Nombre de la tabla en la base de datos
  timestamps: true // Indica si Sequelize debe incluir automáticamente los campos de fecha de creación y actualización
});

module.exports = Usuario;
