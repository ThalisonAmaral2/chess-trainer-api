const split = require('@mliebelt/pgn-parser').split
const { parse } = require('pgn-parser')
const fs = require('fs') 
const path = require('path')
// Read PGN data (could also be from a file or other source)
const pgnData = fs.readFileSync(path.join(__dirname, "sample.pgn"), 'utf-8');

// Parse the PGN data
const game = parse(pgnData)[0];  // Assume the PGN contains only one game
// Function to recursively extract all variants
function extractVariants(move) {
    if (!move.ravs || move.ravs.length === 0) return [];

    return move.ravs.map(variant => {
        return {
            move: variant.move,
            sub_variants: extractVariants(variant)
        };
    });
}

// Function to extract main line and variants
function extractPuzzleData(game) {
    const mainLine = game.moves.map(move => move.move);
    const variants = game.moves.map(move => ({
        move: move.move,
        variants: extractVariants(move)
    }));

    return {
        mainLine,
        variants
    };
}

// Extract the data
const puzzleData = extractPuzzleData(game);

console.log('Main Line:', puzzleData.mainLine);
console.log('Variants:', puzzleData.variants);

// Extract data
// const mainLine = extractMoves(game);
// const variants = extractVariants(game);

// console.log('Main Line:', mainLine);
// console.log('Variants:', variants);