const { DataTypes } = require('sequelize');
const sequelize = require("../config/sequelize")

const tiposColaborador = sequelize.define('tipos_colaborador', {
    clave: {
        type: DataTypes.STRING(3),
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING(255),
        allowNull: false
    }
})

module.exports = tiposColaborador;