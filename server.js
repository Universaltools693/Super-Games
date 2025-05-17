const express = require('express');
const cors = require('cors');
const games = require('./games.json');

const app = express();
app.use(cors());
app.use(express.json());

// API to get all games
app.get('/api/games', (req, res) => {
    res.json(games);
});

// API to search games
app.get('/api/games/search', (req, res) => {
    const query = req.query.q.toLowerCase();
    const filteredGames = games.filter(game =>
        game.title.toLowerCase().includes(query)
    );
    res.json(filteredGames);
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
