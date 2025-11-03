const UserModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userRegisterController = async (req, res) => {
    try {
        const {name, email, password} = req.body;

        if(!name || !email || !password) {
            return res.status(400).json({
                message: 'All fields are required' 
            });
        }

        const userExists = await UserModel.findOne({ email });
        if (userExists) {
            return res.status(400).json({ 
                message: 'User already exists'
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        
        const newUser = new UserModel({
            name,
            email, 
            password: hashedPassword
        },);
        
        const token = jwt.sign( { userId: newUser._id,role: newUser.role }, process.env.JWT_SECRET, { expiresIn: '1h' } );
        res.cookie('token',token);

        await newUser.save(); 

        res.status(201).json({
            message: 'User registered successfully',
            newUser,
            token
        })
        
    } catch (error) {
        console.log("error register  ",error);
        res.status(500).json({
            message: 'Server error',
            error: error.message
        });
    }
}

const userLoginController = async (req, res) => {
    try {
        
        const { email, password } = req.body;

        if(!email || !password) {
            return res.status(400).json({
                message: 'All fields are required'
            });
        }

        const user = await UserModel.findOne({email});
        if(!user){
            return res.status(400).json({
                message:"user not found"
            })
        }

        const ispasswordmatch = await bcrypt.compare(password, user.password);
        if(!ispasswordmatch){
            return res.status(400).json({
                message:"invalid credentials"
            })
        }
        const token = jwt.sign( { userId: user._id,role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' } );
        res.cookie('token',token);

        res.status(200).json({
            message:"login successful",
            user,
            token
        });
    } catch (error) {
        console.log("error login  ",error);
        res.status(500).json({
            message: 'Server error', error: error.message
        });
    }
};

const logoutController = (req, res) => {
    try {
        res.clearCookie('token');
        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        res.status(500).json({
            message: 'Server error',
            error: error.message
        });
    }
};

module.exports = { userRegisterController, userLoginController, logoutController };