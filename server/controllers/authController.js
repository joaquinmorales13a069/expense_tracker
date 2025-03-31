import { User } from '../models/User.js';
import jwt from 'jsonwebtoken';

// Generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h"});
}

// Register User
export const registerUser = async (req, res) => {
    const { fullName, email, password, profileImageUrl} = req.body;

    // Check for missing fields
    if (!fullName || !email || !password) {
        return res.status(400).json({ message: "Please fill all fields" });
    }

    try {
        // Check if user already exists
        if (await User.findOne({ email})) {
            return res.status(400).json({ message: "User already exists" });
        }
        // Create new user
        const user = await User.create({
            fullName,
            email,
            password,
            profileImageUrl,
        })

        res.status(201).json({
            id: user._id,
            user,
            token: generateToken(user._id),
        })
    } catch (error) {
        res.status(500).json({ message: "Error registering user", error: error.message });
    }
}
// Login User
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    // Check for missing fields
    if (!email || !password) {
        return res.status(400).json({ message: "Please fill all fields" });
    }

    try {
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            // User not found or password does not match
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate JWT token
        res.status(200).json({
            id: user._id,
            user,
            token: generateToken(user._id),
        })
    } catch (error) {
        res.status(500).json({ message: "Error logging in user", error: error.message });
    }
}

// Get User Info
export const getUserInfo = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Error fetching user info", error: error.message });
    }
}