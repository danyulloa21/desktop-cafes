const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
    host: process.env.DATABASE_HOST,
    dialect: 'mysql'
})

sequelize.authenticate().then(() => {
    console.log('Sequelize connected to the database')
})

module.exports = sequelize