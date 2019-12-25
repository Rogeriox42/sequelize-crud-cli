const PostgresStrategy = require('./src/strategies/PostgresStrategy')
const Context = require('./src/strategies/ContextStrategy')
const Commander = require('commander')
const Game = require('./src/models/Game')

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

    const game = new Game(Commander)
    const context = new Context(new PostgresStrategy())

    try {
        if (Commander.create) {
            console.log('Create a game')
            console.log('game', game)
            const result = await context.create(game)
            if(!result){
                console.log('Problems during game creation') 
            }
            console.log('Game created Successfully') 
        }
        if (Commander.read) {
            
        }
        if (Commander.update) {

        }
        if (Commander.delete) {

        }
    } catch (Error) {
        console.log('Error', Error)
    }
}

main() 