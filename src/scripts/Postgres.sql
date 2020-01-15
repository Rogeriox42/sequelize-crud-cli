CREATE TABLE game(
    id integer generated always as identity not null primary key, 
    name text not null, 
    genre text not null, 
    price float not null 
)