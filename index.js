const express = require('express')
const app = express();
const split = require('@mliebelt/pgn-parser').split
const { parse } = require('pgn-parser')
const extractValues = require('./methods/extractValues')
const fs = require('fs')
const path = require('path')
const port = 3050;

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
    if (req.method === 'OPTIONS') {
      res.sendStatus(204);
    } else {
      next();
    }
});

app.get('/combinations', (req, res) => {
    console.log('sending...')
    try {
        const pgnFile = "1000Combinations.pgn"
        const fileData = fs.readFileSync(path.join(__dirname, "pgns", pgnFile), 'utf-8');
        const pgns = split(fileData);

        const gamesList = pgns.map((game, index) => {
            try {
                let parsedGame = parse(game.all)[0];
                if(index == 10){
                    // console.log(parsedGame.headers);
                }
                // const pgn = game.pgn;
                const gameData = extractValues(parsedGame.headers, ['White', 'Black', 'Result', 'FEN'])
                // gameData.pgn = game.pgn;
                const moves = parsedGame.moves.map(move => move.move)
                gameData.moves = moves;
                if(moves.length == 0){
                    return null;
                }
                return gameData;

            } catch (error) {
                console.error(error, index, game.all)
                return null;
            }
        }).filter(game => game !== null)
        // console.log(gamesList)

        res.send(gamesList)

    } catch (error) {
        console.error('Error reading PGN file:', error);
        res.status(500).send('Internal Server Error');
    }
    
})
app.get('/capablanca60endings', (req, res) => {
    res.send({response: "Not available yet"})
})

app.listen(port, () => {
    console.log(`Server running at port ${port}`)
})