import User from '../Models/User.js'; 
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        
        const hashedPassword = await bcrypt.hash(password, 10);

       
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });

        
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
      
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

       
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h', 
        });

        res.status(200).json({ token, userId: user._id, message: 'Login successful' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
export { registerUser };