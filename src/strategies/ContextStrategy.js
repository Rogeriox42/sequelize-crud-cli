const InterfaceCrud = require('../db/interface/InterfaceCrud')

class ContextStrategy extends InterfaceCrud{
    constructor(dbstrategy){
        super() 
        this._database = dbstrategy 
    }

    isConnected(){
        return this._database.isConnected()
    }

    async create(item){
        return await this._database.create(item) 
    }
    read(query){
        return this._database.read(query) 
    }
    readAll(){
        return this._database.readAll() 
    }
    update(id, item){
        return this._database.update(id, item) 
    }
    delete(id){
        return this._database.delete(id) 
    }
}

module.exports = ContextStrategy
