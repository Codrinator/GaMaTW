const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
    name: String,
    release_date: Date, // 2002-12-09
    company: String,
    popularity: {type: Number, min: 0, max: 100,default: 0},
    genre: [String], // fps, shooter, rts
    category: String, // Boardgame / Digital
    age_restriction: String,  // G , PG , PG-13 , R , NC-17
    platform: {type: [String], default: ['-']}, // PS4,PC,XBox etc. or empty for board games
    price: {type: Number, default: 0},
    game_description: String
});


const clearPlatformForBoard = async function () {
    const query = Game.find();
    const myQuery = await query.where({category: 'board'}).exec();
    for(let i = 0; i<myQuery.length; i = i+1){
        myQuery[i].platform = ['-'];
        myQuery[i].save();
    }
};

const getTopGames = async function () {
    const query = Game.find();
    query.sort({popularity: -1}).limit(10);
    return query.exec();
};

const getByName=async function(name){
    const query=Game.find();
    query.where({name: name});
    return query.exec();
};

const getNumberOfGames = async function(){
    const query= Game.count();
    return query.exec()
};

const getGamesCollectionSub = async function(noOfItems){
    const query = Game.find();
    query.sort({popularity: -1}).limit(noOfItems);
    return query.exec();
};

const getAll = async function(){
    const query=Game.find();
    return query.exec();
};

const getGamesCollection = async function(noOfItems, category){
    const query = Game.find();
    query.where({category: category}).limit(noOfItems);
    return query.exec();
};

const getNumberOfGamesWithParameters = async function(noOfItems, categorie, genre, switcher, page){
    if(switcher === 1){ // cand alegem din nav-bar
        const query = Game.count();
        query.where({category: categorie, genre: genre}).skip((page-1)*noOfItems);
        const temp = await query.exec();
        return temp;
        }
    if(switcher === 0 ){ //default cand incarcam pagina --> popularity
        const query = Game.count();
        if(categorie === '' && genre !== ''){
            query.sort({popularity: -1}).where({genre: genre}).skip((page-1)*noOfItems);
            const temp = await query.exec();
            return temp;    
        }
        if(categorie !== '' && genre === ''){
            query.sort({popularity: -1}).where({category: categorie}).skip((page-1)*noOfItems);
            const temp = await query.exec();
            return temp;   
        }
        if(categorie !== '' && genre !== ''){
            query.sort({popularity: -1}).where({category: categorie, genre:genre}).skip((page-1)*noOfItems);
            const temp = await query.exec();
            return temp;
        }
        else{
            query.sort({popularity: -1}).skip((page-1)*noOfItems);
            const temp = await query.exec();
            return temp;
            }
    }

    if(switcher === 2 ){ //alphabetically
        const query = Game.count();
        if(genre === '' && categorie !==''){
            query.where({category: categorie}).sort({name: 1}).skip((page-1)*noOfItems);
            const temp = await query.exec();
            return temp;
        }
        if(genre === '' && categorie === ''){
            query.sort({name: 1}).skip((page-1)*noOfItems);
            const temp = await query.exec();
            return temp;
        }
        else{
            query.where({category: categorie, genre: genre}).sort({name: 1}).skip((page-1)*noOfItems);
            const temp = await query.exec();
            return temp;
        }
    }
    if(switcher === 3 ){ //release_Date
        const query = Game.count();
        if(genre === '' && categorie !== ''){
            query.where({category: categorie}).sort({release_date: -1}).skip((page-1)*noOfItems);
            const temp = await query.exec();
            return temp;
        }
        if(genre === '' && categorie === ''){
            query.sort({release_date: -1}).skip((page-1)*noOfItems);
            const temp = await query.exec();
            return temp;
        }
        else{
            query.where({category: categorie, genre: genre}).sort({release_date: -1}).skip((page-1)*noOfItems);
            const temp = await query.exec();
            return temp;
        }
        
    }

    if(switcher === 5 ){ //price
        const query = Game.count();
        if(genre === '' && categorie !== ''){
            query.where({category: categorie}).sort({price: 1}).skip((page-1)*noOfItems);
            const temp = await query.exec();
            return temp;
        }
        if(genre === '' && categorie === ''){
            query.sort({price: 1}).skip((page-1)*noOfItems);
            const temp = await query.exec();
            return temp;
        }
        else{
            query.where({category: categorie, genre: genre}).sort({price: 1}).skip((page-1)*noOfItems);
            const temp = await query.exec();
            return temp;
        }
    }
};


const loadGames = async function(noOfItems, categorie, genre, switcher, page){
    if(switcher === 1){ // cand alegem din nav-bar
        const query = Game.find();
        query.where({category: categorie, genre: genre}).skip((page-1)*noOfItems).limit(noOfItems);
        const temp = await query.exec();
        return temp;
        }
    if(switcher === 0 ){ //default cand incarcam pagina --> popularity
        const query = Game.find();
        if(categorie === '' && genre !== ''){
            query.sort({popularity: -1}).where({genre: genre}).skip((page-1)*noOfItems).limit(noOfItems);
            const temp = await query.exec();
            return temp;    
        }
        if(categorie !== '' && genre === ''){
            query.sort({popularity: -1}).where({category: categorie}).skip((page-1)*noOfItems).limit(noOfItems);
            const temp = await query.exec();
            return temp;   
        }
        if(categorie !== '' && genre !== ''){
            query.sort({popularity: -1}).where({category: categorie, genre:genre}).skip((page-1)*noOfItems).limit(noOfItems);
            const temp = await query.exec();
            return temp;
        }
        else{
            query.sort({popularity: -1}).skip((page-1)*noOfItems).limit(noOfItems);
            const temp = await query.exec();
            return temp;
            }
    }

    if(switcher === 2 ){ //alphabetically
        const query = Game.find();
        if(genre === '' && categorie !==''){
            query.where({category: categorie}).sort({name: 1}).skip((page-1)*noOfItems).limit(noOfItems);
            const temp = await query.exec();
            return temp;
        }
        if(genre === '' && categorie === ''){
            query.sort({name: 1}).skip((page-1)*noOfItems).limit(noOfItems);
            const temp = await query.exec();
            return temp;
        }
        else{
            query.where({category: categorie, genre: genre}).sort({name: 1}).skip((page-1)*noOfItems).limit(noOfItems);
            const temp = await query.exec();
            return temp;
        }
    }
    if(switcher === 3 ){ //release_Date
        const query = Game.find();
        if(genre === '' && categorie !== ''){
            query.where({category: categorie}).sort({release_date: -1}).skip((page-1)*noOfItems).limit(noOfItems);
            const temp = await query.exec();
            return temp;
        }
        if(genre === '' && categorie === ''){
            query.sort({release_date: -1}).skip((page-1)*noOfItems).limit(noOfItems);
            const temp = await query.exec();
            return temp;
        }
        else{
            query.where({category: categorie, genre: genre}).sort({release_date: -1}).skip((page-1)*noOfItems).limit(noOfItems);
            const temp = await query.exec();
            return temp;
        }
        
    }
    
    if(switcher === 5 ){ //price
        const query = Game.find();
        if(genre === '' && categorie !== ''){
            query.where({category: categorie}).sort({price: 1}).skip((page-1)*noOfItems).limit(noOfItems);
            const temp = await query.exec();
            return temp;
        }
        if(genre === '' && categorie === ''){
            query.sort({price: 1}).skip((page-1)*noOfItems).limit(noOfItems);
            const temp = await query.exec();
            return temp;
        }
        else{
            query.where({category: categorie, genre: genre}).sort({price: 1}).skip((page-1)*noOfItems).limit(noOfItems);
            const temp = await query.exec();
            return temp;
        }
    }
};

const getNewGames = async function(){
    const query=Game.find();
    query.sort({release_date: -1}).limit(5);
    return query.exec();
};

const getNewGamesRssFeed=async function(){
    const query=Game.find();
    query.sort({release_date: -1}).limit(10);
    return query.exec();
};

const removeByName=async function(name){
    const query=Game.find();
    query.where({ name:name }).deleteOne();
    query.exec();
};


const Game = mongoose.model('GameCollection', GameSchema);

module.exports = {Game, removeByName, clearPlatformForBoard, getAll, getTopGames, getByName, getNewGamesRssFeed, getNewGames, loadGames, getGamesCollection, getGamesCollectionSub, getNumberOfGames, getNumberOfGamesWithParameters};

