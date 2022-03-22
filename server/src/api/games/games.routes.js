const GameRoutes = require('express').Router();
const upload = require('../../middlewares/updateFile.middleware');
const { isAuth } = require('../../middlewares/auth.middleware');

const {
    getAll,
    getOne,
    postOne,
    patchOne,
    deleteOne
} = require('./games.controller');

GameRoutes.get('/', getAll);
GameRoutes.get('/:id', getOne);
GameRoutes.post('/', upload.single('img'), postOne);
GameRoutes.patch('/:id', upload.single('img'), [isAuth], patchOne);
GameRoutes.delete('/:id', [isAuth], deleteOne);

module.exports = GameRoutes;