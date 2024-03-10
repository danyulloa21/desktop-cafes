const { DataTypes } = require('sequelize');
const sequelize = require("../config/sequelize")

const Solicitantes = sequelize.define('solicitantes', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    nombres: {
        type: DataTypes.STRING(255),
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
    domicilio: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    municipio: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    telefono: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    correo_electronico: {
        type: DataTypes.STRING(255),
        allowNull: false
    }
}, {createdAt: false, updatedAt: false})

module.exports = Solicitantes;