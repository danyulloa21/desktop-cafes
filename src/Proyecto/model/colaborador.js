const { DataTypes } = require('sequelize');
const sequelize = require("../config/sequelize")
const licenciaturas = require('../model/licenciatura');
const tiposColaborador  = require('../model/tipo_colaborador');

const colaboradores = sequelize.define('colaboradores', {
    matricula: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    clave_licenciatura: {
        type: DataTypes.STRING(4),
        allowNull: false
    },
    nombres: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    tipo: {
        type: DataTypes.STRING(3),
        allowNull: false
    },
    apellido_paterno: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    apellido_materno: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    correo_personal: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    telefono: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    contrasena: {
        type: DataTypes.STRING(64),
        allowNull: false
    },
    estado: {
        type: DataTypes.ENUM('Activo', 'Inactivo'),
        allowNull: false,
        defaultValue: 'Activo'
    }
},{createdAt: false, updatedAt: false})

colaboradores.belongsTo(licenciaturas, { foreignKey: 'clave_licenciatura' });
colaboradores.belongsTo(tiposColaborador, { foreignKey: 'tipo' });

module.exports = colaboradores;