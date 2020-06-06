const RSS = require ('rss');
const newGames = require ('../Models/GameModel').getNewGamesRssFeed;

const generateFeed = async function (req,res){
    const feed = new RSS({
        title: 'Gamma Feed',
        description: 'Newest games on Gamma',
        feed_url: 'http://localhost/11100/rssFeed',
        site_url: 'http://localhost/11100/',
        language: 'en',
    });

    const games = await  newGames();

    for (let i = 0; i < games.length; i++){
        feed.item({
            title: games[i].name,
            date: games[i].release_date.toLocaleDateString(),
            description: games[i].game_description
        });
    }

    const xml = feed.xml();

    res.statusCode = 200;
    res.write(xml);
    res.end();
}

module.exports = {generateFeed};