const { Sequelize } = require("sequelize");
require('dotenv').config()

const {HOST,USERNAME,PASSWORD,PORT,DIALECT,DATABASE} = process.env

const sequelize = new Sequelize(DATABASE,USERNAME,PASSWORD, {
    host: HOST,
    dialect: DIALECT,
    port: PORT,
})

module.exports = sequelize

const checkConnect = () => { 
    try{
        sequelize.authenticate()
        console.log('success')
    } catch(err){
        console.log('failed', err)
    }
}
checkConnect()