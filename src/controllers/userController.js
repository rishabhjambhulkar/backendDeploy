import User from '../models/UserModel.js';

// Controller to add a user
export const addUser = async (req, res) => {
    try {
        const { name, email, phone, address } = req.body;

        // Create a new user
        const newUser = new User({ name, email, phone, address });
        await newUser.save();

        res.status(201).json({ message: 'User added successfully', user: newUser });
    } catch (error) {
        res.status(400).json({ message: 'Error adding user', error: error.message });
    }
};
