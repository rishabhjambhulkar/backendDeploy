import mongoose from 'mongoose';

// Define the User Schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    address: {
        type: String,
        required: false,
        trim: true,
    },
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

export default User;