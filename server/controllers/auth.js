import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../models/User.js';


// Regisrer USer 
export const register = async (req, res) => {
    try {
        const { firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation } = req.body;

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);    
        const user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ error: 'User already exists' });
        }
    }