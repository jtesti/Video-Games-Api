const Console = require('./consoles.model');
const { deleteFile } = require('../../middlewares/deleteFile.middleware');
const { setError } = require('../../utils/error/error');

const getAll = async (req, res, next) => {
    try {
        const consoles = await Console.find().populate("videogames");
        res.status(200).json(consoles);
    } catch (error) {
        return next(setError(404,'Unable to get consoles'))
    }
}

const getOne = async (req, res, next) => {
    try {
        const { id } = req.params;
        const console = await Console.findById(id).populate("videogames");
        res.status(200).json(console);
    } catch (error) {
        return next(setError(404,'Unable to get console'))
    }
}

const postOne = async (req, res, next) => {
    try {
        const console = new Console();
        console.name = req.body.name;
        console.maker = req.body.maker;
        console.price = req.body.price;
        console.fabrication = req.body.fabrication;
        console.type = req.body.type;
        console.sales = req.body.sales;
        if (req.file) console.img = req.file.path
        console.videogames = req.body.videogames;

        const consoleDB = await console.save();
        return res.status(201).json(consoleDB)
    } catch (error) {
        return next(setError(404,'Unable to create console'))
    }
}

const patchOne = async (req, res, next) => {
    try {
        const { id } = req.params;
        const console = new Console();
        console.name = req.body.name;
        console.maker = req.body.maker;
        console.price = req.body.price;
        console.fabrication = req.body.fabrication;
        console.type = req.body.type;
        console.sales = req.body.sales;
        if (req.file) console.img = req.file.path
        console.videogames = req.body.videogames;

        console._id = id;
        const updateConsole = await Console.findByIdAndUpdate(id, console);
        return res.status(200).json(updateConsole);
    } catch (error) {
        return next(setError(404,'Unable to modificate console'))
    }
}

const deleteOne = async (req, res, next) => {
    try {
        const { id } = req.params;
        const console = await Console.findByIdAndDelete(id);
        if (console.img) deleteFile(console.img)
        return res.status(200).json(console);
    } catch (error) {
        return next(setError(404,'Unable to delete console'))
    }
}

module.exports = {
    getAll,
    getOne,
    postOne,
    patchOne,
    deleteOne
}