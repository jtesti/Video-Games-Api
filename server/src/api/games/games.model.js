const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        price: { type: String, required: true, trim: true },
        categories: [{ type: String, required: false }],
        platform: [{ type: String, required: true, trim: true }],
        img: { type: String, required: false, trim: true },
        description: { type: String, required: false, trim: true }
    },
    {
        timestamps: true
    }
);

const Games = mongoose.model('games', gameSchema);
module.exports = Games;