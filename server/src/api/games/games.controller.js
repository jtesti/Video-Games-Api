const Game = require('./games.model');
const { deleteFile } = require('../../middlewares/deleteFile.middleware');
const { setError } = require('../../utils/error/error');

const getAll = async (req, res, next) => {
    try {
        const games = await Game.find();
        res.status(200).json(games);
    } catch (error) {
        return next(setError(404,'Unable to get games'))
    }
}

const getOne = async (req, res, next) => {
    try {
        const { id } = req.params;
        const game = await Game.findById(id);
        res.status(200).json(game);
    } catch (error) {
        return next(setError(404,'Unable to get game'))
    }
}

const postOne = async (req, res, next) => {
    try {
        const game = new Game();
        game.name = req.body.name;
        game.price = req.body.price;
        game.categories = req.body.categories;
        game.platform = req.body.platform;
        if (req.file) game.img = req.file.path
        game.description = req.body.description;

        const gameDB = await game.save();
        return res.status(201).json(gameDB)
    } catch (error) {
        return next(setError(404,'Unable to create game'))
    }
}

const patchOne = async (req, res, next) => {
    try {
        const { id } = req.params;
        const game = new Game();
        game.name = req.body.name;
        game.price = req.body.price;
        game.categories = req.body.categories;
        game.platform = req.body.platform;
        if (req.file) game.img = req.file.path
        game.description = req.body.description;
        game._id = id;
        const updateGame = await Game.findByIdAndUpdate(id, game);
        return res.status(200).json(updateGame);
    } catch (error) {
        return next(setError(404,'Unable to modificate game'))
    }
}

const deleteOne = async (req, res, next) => {
    try {
        const { id } = req.params;
        const game = await Game.findByIdAndDelete(id);
        if (game.img) deleteFile(game.img)
        return res.status(200).json(game);
    } catch (error) {
        return next(setError(404,'Unable to delete game'))
    }
}

module.exports = {
    getAll,
    getOne,
    postOne,
    patchOne,
    deleteOne
}