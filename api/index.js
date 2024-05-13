const express = require('express');
const router = express.Router();
const db = require ('./db');

// GET /api/health
router.get('/health', (req, res, next) => {
    res.send('OK');
});

// ROUTER: /api/video-games
router.use('/video-games', require('./videoGames'));

// ROUTER: /api/board-games
router.use('/board-games', require('./boardGames'));

//GET /api/videoganes/:id
router.get('/video-games/:id', async (req, res, next) => {
    const gameId = req.params.id;

    try{
        const queryText = 'SELECT * FROM video_games WHERE id = $1';
        const {rows} = await db.query(queryText, [gameId]);

        if (rows.length === 0){
            return res.status(404).json({ message : `Video game with ID ${gameId} not found`});
        }
        res.json(rows[0]);
    } catch(error) {
        console.error('Error retrieving video game by ID:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;