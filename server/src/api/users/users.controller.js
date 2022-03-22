const User = require('./users.model');
const bcrypt = require('bcrypt');
const { generateToken } = require('../../utils/jwt/jwt');
const { setError } = require('../../utils/error/error');

const register = async (req, res, next) => {
    try {
        const user = new User(req.body);
        const userExist = await User.findOne({ email: user.email })
        if (userExist) {
            return next(setError(404,'This Email already exists'))
        }
        const userDB = await user.save();
        return res.status(201).json(userDB.email)

    } catch (error) {
        return next(setError(404,'Unable to create user'))
    }
}

const login = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return next(setError(404,'You are not registered'))
        }
        if (bcrypt.compareSync(req.body.password, user.password)) {
            const token = generateToken(user._id, user.email);
            return res.status(200).json(token);
        }
    } catch (error) {
        return next(setError(404,'Unable to login'))
    }
}

const logout = (req, res, next) => {
    try {
        const token = null;
        return res.status(201).json(token)
    } catch (error) {
        return next(setError(404,'Unable to logout'))
    }
}

module.exports = { register, login, logout }