const assert = require('assert')
const PostgresStrategy = require('./src/strategies/postgres/PostgresStrategy')
const ContextStrategy = require("./src/strategies/ContextStrategy")

const GAME_CRIAR_MOCK = {
    'nome': 'Mortal Kombat XI',
    'genero': 'Luta'
}

const GAME_ATUALIZAR_MOCK = {
    'nome': 'Resident Evil 2 Remake', 
    'genero': 'Survival Horror' 
}

GAME_MOCK_DELETAR_ID = 6 

describe('PostresStrategy Test', function () {
    const context = new ContextStrategy(new PostgresStrategy())
    
    this.beforeAll( async() =>{
        await context.create(GAME_ATUALIZAR_MOCK) 
    })
    
    
    
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

    it.only('Update Games', async () =>{
        const item = await context.read({'nome': GAME_ATUALIZAR_MOCK.nome})
        const newData = {
            ... GAME_ATUALIZAR_MOCK, 
            nome: 'Silent Hill'
        }

        const [result] = await context.update(item.id, newData)
        assert.deepEqual(result, 1)
    })

    // it('Delete Game', async () =>{
    //     const result = await context.delete(GAME_MOCK_DELETAR_ID) 
    //     assert.deepEqual(result, true) 
    // })
})