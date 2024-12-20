import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true,
    unique: true // Ensure one document per user
  },
  addresses: [
    {
      address: { type: String, required: true },
      door: { type: String, required: true },
      landmark: { type: String, required: true },
      type: { 
        type: String, 
        enum: ['Home', 'Work', 'Other'], 
        required: true 
      },
      createdAt: { type: Date, default: Date.now },
      updatedAt: { type: Date, default: Date.now }
    }
  ]
});

export default mongoose.model('Address', addressSchema);
