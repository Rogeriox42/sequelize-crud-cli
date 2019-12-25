const uuid = require('uuid/v1')

class Game{
    constructor({name, genre, price}){
        // this.id = id ? id : uuid() 
        this.name = name, 
        this.genre = genre
        this.price = parseFloat(price)
    }
}

module.exports = Game 