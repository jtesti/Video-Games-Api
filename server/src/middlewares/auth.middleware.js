const User = require('../api/users/users.model');
const { setError } = require('../utils/error/error');
const {verifyToken} = require ('../utils/jwt/jwt')

const isAuth = async (req, res, next) => {
    try {
        
        const token = req.headers.authorization;
        if (!token) {
            
            return next(new Error);
        }
        
        const parsedToken = token.replace('Bearer ', '');
        const validToken = verifyToken(parsedToken, process.env.JWT_SECRET);
        const userLogued = await User.findById(validToken.id);
        req.user = userLogued;
        next();
    } catch (error) {
        return next(setError(404,'You are not logged in'))
    }
}

module.exports = { isAuth }