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
        .option('-ra, --readall', 'Read all the games') 

        .option('-i, --id [value]', 'ID of the game')
        .option('-n, --name [value]', 'Name of the game')
        .option('-g, --genre [value]', 'Genre of the Game')
        .option('-p, --price [value]', 'Price of the Game')
        .parse(process.argv)

    const game = new Game(Commander)
    const context = new Context(new PostgresStrategy())

    try {
        if (Commander.create) {
            const result = await context.create(game)
            if (!result) {
                console.log('Problems during game creation')
            }
            console.log(`The game ${game.name} was created successfully!`)
        }

        if (Commander.read) {
            const id = parseInt(Commander.id)
            const item = await context.read({ id: id })
            console.log('Game info: ', item)
        }

        if(Commander.readall){
            const items = await context.readAll()
            console.log('items', items) 
            // items.map( item => console.log(item)) 
        }

        if (Commander.update) {
            const id = parseInt(Commander.id)
            const result = await context.update(id, game)
            if (!result) {
                console.log('Problems during game update')
            }
            console.log(`The game ${game.name} was updated successfully!`)
        }

        if (Commander.delete) {
            const id = parseInt(Commander.id)
            const item = await context.read({ id: id })
            const result = await context.delete(id) 
            if (!result) {
                console.log('Problems during game exclusion')
            }
            console.log(`The game ${item.name} was deleted successfully!`)
        }

    } catch (Error) {
        console.log('Error', Error)
    }
}

main() 