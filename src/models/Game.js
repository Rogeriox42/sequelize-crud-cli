class Game{
    constructor(){
        this.name = null 
        this.genre = null
        this.price = null 
    }

    constructor(name, genre, price){
        this.name = name, 
        this.genre = genre
        this.price = price  
    }
}

module.exports = Game 