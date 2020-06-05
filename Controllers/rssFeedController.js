const RSS = require ('rss');

const generateFeed = async function (req,res){
    var feed = new RSS({
        title: 'Gamma Feed',
        description: 'Newest games on Gamma',
        feed_url: 'http://localhost/11100/rssFeed',
        site_url: 'http://localhost/11100/',
        language: 'en',
    });

    feed.item({
        title: "numeJoc",
        date: "releaseDate",
        description: "descriere"
    });

    const xml = feed.xml();

    res.statusCode = 200;
    res.write(xml);
    res.end();
}

module.exports = {generateFeed};