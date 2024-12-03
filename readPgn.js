const split = require('@mliebelt/pgn-parser').split
const { parse } = require('pgn-parser')
const fs = require('fs') 
const path = require('path');

const gamesList = [];

const extractValues = (array, keys) => {
    return array.reduce((acc, item) => {
      if (keys.includes(item.name)) {
        acc[item.name.toLowerCase()] = item.value;
      }
      return acc;
    }, {});
  };
const getYear = (date) => {
    return date.slice(0,4)
}


fs.readFile(path.join(__dirname, "pgns", "1000Combinations.pgn"), 'utf-8', (err, data) => {
    if(err) throw err;

    //Parse to get the headers
    //Split to get pgn string 
    // const games = parse(data, {startRule: "games"})
    // const pgns = split(data, {startRule: "games"})

    const pgns = split(data)
    pgns.forEach((game, index) => {
        try {
            let parsedGame = parse(game.all)[0];
            const pgn = game.pgn;
            const {white, black, result} = extractValues(parsedGame.headers, ['White', 'Black', 'Result'])
            console.log({white, black, result, pgn})
            
        } catch (error) {
            console.log(error, index)
            console.log(game.all)
        }
    })
    
    


        // console.log(games[0].headers)
        // const header = extractValues(games[0].headers, ['White', 'Black', 'Result'])
        // const header = extractValues(games[0].headers, ['White', 'Black', 'Result', 'EventDate'])
        // console.log(header)
    
    // pgns.forEach((game, index) => {
    //     const {white, black, result, eventdate} = extractValues(games[index].headers, ['White', 'Black', 'Result', 'EventDate'])
    //     const pgn = game.pgn

    //     if(eventdate == undefined){
    //         console.log({white, black, eventdate})
    //     }
    //     const year = eventdate.slice(0, 4)
    //     gamesList.push({white, black, pgn, result})
    // })
    
})

const fileData = fs.readFileSync(path.join(__dirname, "pgns", "1000Combinations.pgn"), 'utf-8');

const pgns = split(fileData)
pgns.forEach((game, index) => {
    try {
        let parsedGame = parse(game.all)[0];
        const pgn = game.pgn;
        const {white, black, result} = extractValues(parsedGame.headers, ['White', 'Black', 'Result'])
        console.log({white, black, result, pgn})
        
    } catch (error) {
        console.log(error, index)
        console.log(game.all)
    }
})