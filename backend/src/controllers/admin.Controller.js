

const adminController = (req, res) => {
    try {
        const user = req.user;
        res.status(200).json({ user });
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = { adminController };