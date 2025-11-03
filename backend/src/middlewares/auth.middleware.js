const jwt = require('jsonwebtoken');


const authmiddleware = (req, res, next) => {
    try {

        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ 
                message: 'token not found'
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(401).json({ message: 'Unauthorized: Invalid token' });
        }

        req.user = decoded;
        next();
        
    } catch (error) {
        console.error('Error fetching user:', error);
        return res.status(500).json({ 
            message: 'Internal Server Error'
        });  
    }
};

module.exports = authmiddleware;