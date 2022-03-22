const ConsoleRoutes = require('express').Router();
const upload = require('../../middlewares/updateFile.middleware');
const { isAuth } = require('../../middlewares/auth.middleware');

const {
    getAll,
    getOne,
    postOne,
    patchOne,
    deleteOne
} = require('./consoles.controller');

ConsoleRoutes.get('/', getAll);
ConsoleRoutes.get('/:id', getOne);
ConsoleRoutes.post('/', upload.single('img'), postOne);
ConsoleRoutes.patch('/:id', upload.single('img'), [isAuth], patchOne);
ConsoleRoutes.delete('/:id', [isAuth], deleteOne);

module.exports = ConsoleRoutes;