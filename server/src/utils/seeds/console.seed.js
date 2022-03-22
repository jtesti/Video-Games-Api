const mongoose = require('mongoose');
const Console = require('../../api/consoles/consoles.model');

require('dotenv').config();

const URIDB = process.env.MONGO_DB;

const consoles = [
    {
        name: "",
        maker: "",
        price: "",
        fabrication: "",
        type: "",
        sales: "",
        img: "",
        videogames: []
    },
   
]

mongoose.connect(URIDB, { useNewUrlParser: true, useUnifiedTopology: true }).then(async () => {
    const allConsoles = await Console.find();
    if (allConsoles.length) {
        await Console.collection.drop();
        console.log('TODO BORRADO')
    }
}).catch((err) => console.error('HAY UN ERROR EN EL BORRADO')).then(async () => {
    await Console.insertMany(consoles);
    console.info('Creado')
}).catch((err) => console.error('HAY UN ERROR EN EL CREADO')).finally(() => mongoose.disconnect());