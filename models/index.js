const { Sequelize } = require("sequelize")

const sequelize = new Sequelize('contactsdb', "root" , "", {
    host : "localhost",
    dialect: "mysql"
})

sequelize.authenticate()
.then(() =>
    console.log('MySQL Connected'))
.catch((err)=>
    console.log('Error :'+ err))

module.exports = sequelize;