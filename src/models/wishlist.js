import mongoose from 'mongoose';
const { Schema } = mongoose;

const WishlistSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
      required: true,
    },
    likedCakes: [
      {
        type: String, // Store as string instead of ObjectId
      },
    ],
    likedBakers: [
      {
        type: String, // Store as string instead of ObjectId
      },
    ],
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

export default mongoose.model('Wishlist', WishlistSchema);
