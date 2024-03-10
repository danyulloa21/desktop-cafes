const { DataTypes } = require('sequelize');
const sequelize = require("../config/sequelize")
const solicitantes = require('../model/solicitante');

const solicitudes = sequelize.define('solicitudes', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    id_solicitante: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    organizacion: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false
    },
    estado: {
        type: DataTypes.ENUM('Aceptada', 'Rechazada', 'Espera'),
        allowNull: false,
        defaultValue: 'Espera'
    }
},{
    updatedAt: false,
    createdAt: false
})

solicitudes.belongsTo(solicitantes, { foreignKey: 'id_solicitante' });

module.exports = solicitudes;