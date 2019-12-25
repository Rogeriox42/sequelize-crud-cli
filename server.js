const PostgresStrategy = require('./src/strategies/PostgresStrategy')
const Commander = require('commander')

async function main(params) {
    Commander
        .version('v1')
        .option('-c, --create', 'Create a new game')
        .option('-r, --read', 'Read a game')
        .option('-u, --update', 'Update a game')
        .option('-d, --delete', 'Delete a game')
        .option('-i, --id [value]', 'ID of the game')
        .option('-n, --name [value]', 'Name of the game')
        .option('-g, --genre [value]', 'Genre of the Game')
        .option('-p, --price [value]', 'Price of the Game')
        .parse(process.argv)

    try {
        if (Commander.create) {
            const data = Commander.create
            console.log('data', data)
        }
    } catch (Error) {
        console.log('Error', Error)
    }
}

main() 