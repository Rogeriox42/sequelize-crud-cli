const assert = require('assert')
const PostgresStrategy = require('./src/strategies/postgres/PostgresStrategy')
const ContextStrategy = require("./src/strategies/ContextStrategy")

const GAME_CRIAR_MOCK = {
    'nome': 'Mortal Kombat XI',
    'genero': 'Luta'
}

GAME_MOCK_DELETAR_ID = 6 

describe('PostresStrategy Test', function () {
    const context = new ContextStrategy(new PostgresStrategy())
    
    it('Connection Test', async () => {
        const result = await context.isConnected()
        assert.equal(result, true)
    })



    it('Create Game', async () =>{
        // let result = {}
        const result = await context.create(GAME_CRIAR_MOCK) 
        delete result.id
        assert.deepEqual(result, GAME_CRIAR_MOCK)
    })

    it('List Game', async () =>{
        const result = await context.read(GAME_CRIAR_MOCK.nome)
        delete result.id 
        assert.deepEqual(result, GAME_CRIAR_MOCK) 
    })

    // it('Delete Game', async () =>{
    //     const result = await context.delete(GAME_MOCK_DELETAR_ID) 
    //     assert.deepEqual(result, true) 
    // })
})