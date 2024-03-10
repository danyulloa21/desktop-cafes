const { DataTypes } = require('sequelize');
const sequelize = require("../config/sequelize")

const licenciaturas = sequelize.define('licenciaturas', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    departamento: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
})

module.exports = licenciaturas;