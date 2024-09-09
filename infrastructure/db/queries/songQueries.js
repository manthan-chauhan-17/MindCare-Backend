const mongoose = require('mongoose');
const { connectToDatabase } = require('..');

const songSchema = new mongoose.Schema({
    id : Number,
    title: String,
    author: String,
    songLink : String
});

const Song = mongoose.model('songs', songSchema);

const getAllSongs = async () => {
    await connectToDatabase();

    try {
        const result = await Song.find();
        return result;
    } catch (err) {
        console.error("Failed to fetch songs", err);
    }
};

module.exports = {getAllSongs};
