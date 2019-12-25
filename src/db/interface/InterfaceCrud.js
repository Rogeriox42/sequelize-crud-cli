const NotImplemented = require('../../strategies/NotImplemented') 

class InterfaceCrud{
       
    isConnected(){
        throw new NotImplemented() 
    }
    create(item){
        throw new NotImplemented() 
    }
    read(){
        throw new NotImplemented() 
    }
    update(id, item){
        throw new NotImplemented() 
    }
    delete(id){
        throw new NotImplemented() 
    }
}

module.exports = InterfaceCrud