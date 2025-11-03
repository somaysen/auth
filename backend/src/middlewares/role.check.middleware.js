

const roleCheckMiddleware = (requiredRole) => {
    return (req, res, next) => {
        try {
            const user = req.user;
            if (!user) {
                return res.status(403).json({ message: 'Forbidden: No user information found' });
            }

            if (req.user.role !== requiredRole) {
                return res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
            }

            next();
        } catch (error) {
            console.error('Error in role check middleware:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    };
};

module.exports = roleCheckMiddleware;