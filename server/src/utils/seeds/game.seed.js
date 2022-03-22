const mongoose = require('mongoose');
const Game = require('../../api/games/games.model');

require('dotenv').config();

const URIDB = process.env.MONGO_DB;

const games = [
    {
        name: "",
        price: "",
        categories: [],
        platform: [],
        img: "",
        description: ""
    },
   
]

mongoose.connect(URIDB, { useNewUrlParser: true, useUnifiedTopology: true }).then(async () => {
    const allGames = await Game.find();
    if (allGames.length) {
        await Game.collection.drop();
        console.log('TODO BORRADO')
    }
}).catch((err) => console.error('HAY UN ERROR EN EL BORRADO')).then(async () => {
    await Game.insertMany(games);
    console.info('Creado')
}).catch((err) => console.error('HAY UN ERROR EN EL CREADO')).finally(() => mongoose.disconnect());