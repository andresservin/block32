const client = require('./client');
const util = require('util');
const db = require ('./db');

const REPLACE_ME = 'HELP REPLACE ME!!!!';

// GET - /api/video-games - get all video games
async function getAllVideoGames() {
    try {
        const { rows: videoGames } = await client.query(REPLACE_ME);
        return videoGames;
    } catch (error) {
        throw new Error("Make sure you have replaced the REPLACE_ME placeholder.")
    }
}

// GET - /api/video-games/:id - get a single video game by id
async function getVideoGameById(id) {
    try {
        const { rows: [videoGame] } = await client.query(`
            SELECT * FROM videoGames
            WHERE id = $1;
        `, [id]);
        return videoGame;
    } catch (error) {
        throw error;
    }
}

// POST - /api/video-games - create a new video game
async function createVideoGame(name, genre, releaseYear) {
    try {
        const queryText = 'INSERT INTO video_games(name, genre, release_year) VAULES($1, $2, $3) RETURNING ';
        const vaules = [name, genre, releaseYear];

        const{rows} = await db.query(queryText, vaules);
        return rows[0];
        }catch(error){
            console.error('Error creating video game:' ,error);
            throw error;
        }

}

// PUT - /api/video-games/:id - update a single video game by id
async function updateVideoGame(id, fields = {}) {
    try { 
        const queryText = 'UPDATE video_games SET name = $1, genre = $2, release_year = $3 WHERE id = $4 RETURNING ';
        const vaules = [name, genre, releaseYear, id];

        const{rows} = await db.query(queryText, vaules);
        if (rows.length === 0){
            throw new Error(`Video game with ID ${id} not found`);
        }
        return rows[0];
    } catch (error) {
        console.error('Error updating video game:', error);
        throw error;
    }
}

// DELETE - /api/video-games/:id - delete a single video game by id
async function deleteVideoGame(id) {
    try{
        const queryText = 'DELETE FROM video_game WHERE id = $1 RETURNING';
        const values = [id];

        const {rows} = await db.query(queryText, values);
        if (rows.length === 0) {
            throw new Error(`Video game with ID ${id} not found`);
        }
        return rows [0];
    }catch (error){
        console.error('Error deleting video game:', error);
        throw error;
    }
    
}

module.exports = {
    getAllVideoGames,
    getVideoGameById,
    createVideoGame,
    updateVideoGame,
    deleteVideoGame
}