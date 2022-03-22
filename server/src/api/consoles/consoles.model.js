const mongoose = require('mongoose');

const consoleSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        maker: { type: String, required: true, trim: true },
        price: { type: String, required: true, trim: true },
        fabrication: { type: Number, required: true, trim: true },
        type: { type: String, required: true, trim: true },
        sales: { type: String, required: true, trim: true },
        img: { type: String, required: false, trim: true },
        videogames: [{ type: mongoose.Schema.Types.ObjectId, ref: "games", required: false }]

    },
    {
        timestamps: true
    }
);

const Console = mongoose.model('consoles', consoleSchema);
module.exports = Console;