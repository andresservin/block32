const express = require('express');
const router = express.Router();

const { getAllVideoGames,
    getVideoGameById,
    createVideoGame,
    updateVideoGame,
    deleteVideoGame } = require('../db/videoGames');


// GET - /api/video-games/:id - get a single video game by id
router.get('/:id', async (req, res, next) => {
    try {
        const videoGame = await getVideoGameById(REPLACE_ME);
        res.send(videoGame);
    } catch (error) {
        next(error);
    }
});

// POST - /api/video-games - create a new video game
router.post('/', async (req, res, next) => {
    const { name, genre, releaseYear } = req.body;

    try{
        const newVideoGame = await createVideoGame(name, genre, releaseYear);
        res.status(201).json(newVideoGame);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error'});
    }
});


// PUT - /api/video-games/:id - update a single video game by id
router.put('/:id', async (req, res, next) => {
    const gameId = req.params.id;
    const { name, genre, releaseYear} = req.body;

    try{
        const updatedVideoGame = await updateVideoGame (gameId, name, genre, releaseYear);
        res.json(updatedVideoGame);
    }catch (error) {
        if (error.message.includes('not found')) {
            res.status(404).json({ message: error.message});
        } else{
            res.status(500).json ({message : 'Internal Serever Error'});
        }
    }
});

// DELETE - /api/video-games/:id - delete a single video game by id
router.delete('/:id', async (req, res, next) => {
    const gameId = req.params.id;

    try{
        const deleteVideoGame = await deleteVideoGame(gameId);
        res.json({ message : `Video game with ID ${gameId} deleted successfully`});
    }catch (error){
        if (error.message.includes('not found')){
            res.status(404).json({ message: error.message});
        }else {
            res.status(500).json({message: 'Internal Server Error'});
        }
    }
});

module.exports = router;
