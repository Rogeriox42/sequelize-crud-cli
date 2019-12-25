const Sequelize = require('Sequelize')

const driver = new Sequelize(
    'heroes', 'rogeriorodrigues', 'senhasupersecreta',
    {
        host: 'localhost',
        dialect: 'postgres',
        quoteIdentifiers: false,
        operatorAliases: false
    }
)

async function main() {
    const Herois = driver.define('herois', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            required: true,
            primaryKey: true
        },
        nome: {
            type: Sequelize.TEXT,
            required: true
        },
        poder: {
            type: Sequelize.TEXT,
            required: true
        }
    }, {
        tableName: 'TB_HEROIS',
        freezeTableName: false,
        timestamps: false
    })

    await Herois.sync()
    await Herois.create({'nome': 'Hal Jordan', poder: 'Green Ring'})

    const result = await selectAll(Herois) 
    console.log('result', result) 

    
}

async function selectAll(driver){
    return await driver.findAll({ raw: true })
}

main() 