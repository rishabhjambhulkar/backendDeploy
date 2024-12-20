const mongoose = require('mongoose');
const { Schema } = mongoose;

const WishlistSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  likedCakes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Cake', // Reference to the Cake model
    },
  ],
  likedBakers: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Baker', // Reference to the Baker model
    },
  ],
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});

module.exports = mongoose.model('Wishlist', WishlistSchema);
