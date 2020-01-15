const InterfaceCrud = require('../db/interface/InterfaceCrud')
const Sequelize = require('sequelize')
const dotenv = require('dotenv').config()

const DBNAME = process.env.DBNAME || '' 
const USER = process.env.USER 
const PWD = process.env.PASSWORD

// console.log('dbname', DBNAME) 
// console.log('USER', USER) 
// console.log('PWD', PWD) 

// host, dialect, quoteIdentifiers, operatorAliases 

class PostgresStrategy extends InterfaceCrud {
    constructor() {
        super() 
        this._banco = null
        this._driver = null
        this._connect() 
    }

    async create(item) {
        const {dataValues}  = await this._banco.create(item) 
        return dataValues 
    }

    async delete(id){
        const query = id ? {id: id} : {} 
        return await this._banco.destroy({where: query})
    }
    
    async read(query = {}){
        // console.log('nome', nome) 
        const [{dataValues}] = await this._banco.findAll({where: query, rawQuery: true})
        return dataValues
    }

    async update(id, item){
        const result = await this._banco.update( item, { where:{id: id}} )
        return result 
    }

    async isConnected(){
        try{
            await this._driver.authenticate() 
            return true;             
        }catch(error){
            console.log('Error Authenticating Sequelize', error)
            return false; 
        }
    }

    async _connect() {
        // this._driver = new Sequelize('heroes', 'rogeriorodrigues', 'senhasupersecreta', {
        // this._driver = new Sequelize('herois', 'postgres', 'masterpwd', {
        this._driver = new Sequelize(DBNAME, USER, PWD, {
            host: 'localhost',
            dialect: 'postgres',
            quoteIdentifiers: false,
            operatorAliases: false, 
            logging: false
        })

        await this._modelDatabase() 
    }

    async _modelDatabase() {
        this._banco = this._driver.define('Games',
            {
                id: {
                    type: Sequelize.INTEGER,
                    required: true,
                    autoIncrement: true, 
                    primaryKey: true
                },
                name: {
                    type: Sequelize.STRING,
                    required: true
                },
                genre: {
                    type: Sequelize.STRING,
                    required: true
                }, 
                price: {
                    type: Sequelize.FLOAT,
                    required: true 
                }
            },
            {
                tableName: 'game',
                freezeTableName: false,
                timestamps: false
            }
        )

        await this._banco.sync() 
    }
}

module.exports = PostgresStrategy