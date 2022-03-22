const mongoose = require('mongoose');
const User = require('../../api/users/users.model');

require('dotenv').config();

const URIDB = process.env.MONGO_DB;

const users = [
    {
        email: "tomas@mail.es",
        password: "tomas1234"
    },
    {
        email: "javier@mail.es",
        password: "javier"
    },
    {
        email: "jorge@mail.es",
        password: "jorge1234"
    },
    {
        email: "ivan@mail.es",
        password: "ivan1234"
    }
]

mongoose.connect(URIDB, { useNewUrlParser: true, useUnifiedTopology: true }).then(async () => {
    const allUsers = await User.find();
    if (allUsers.length) {
        await User.collection.drop();
        console.log('TODO BORRADO')
    }
}).catch((err) => console.error('HAY UN ERROR EN EL BORRADO')).then(async () => {
    await User.insertMany(users);
    console.info('Creado')
}).catch((err) => console.error('HAY UN ERROR EN EL CREADO')).finally(() => mongoose.disconnect());