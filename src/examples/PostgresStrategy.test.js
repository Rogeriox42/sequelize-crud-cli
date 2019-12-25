const assert = require('assert')
const PostgresStrategy = require('../strategies/PostgresStrategy')
const ContextStrategy = require("../strategies/ContextStrategy")

const GAME_CRIAR_MOCK = {
    'name': 'Mortal Kombat XI',
    'genre': 'Luta',
    'price': null
}

const GAME_ATUALIZAR_MOCK = {
    'name': 'Resident Evil 2 Remake', 
    'genre': 'Survival Horror', 
    'price': null
}

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
        const result = await context.read({'name': GAME_CRIAR_MOCK.name})
        delete result.id 
        assert.deepEqual(result, GAME_CRIAR_MOCK) 
    })

    it('Update Games', async () =>{
        const item = await context.read({'name': GAME_ATUALIZAR_MOCK.name})
        const newData = {
            ... GAME_ATUALIZAR_MOCK, 
            name: 'Silent Hill'
        }
        const [result] = await context.update(item.id, newData)
        const itemAtualizado = await context.read({id: item.id}) 
        assert.deepEqual(itemAtualizado.name, newData.name) 
        assert.deepEqual(result, 1)
    })

    it('Delete Game', async () =>{
        const item = await context.read() 
        const result = await context.delete(item.id) 
        assert.deepEqual(result, true) 
    })
})