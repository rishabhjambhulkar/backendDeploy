import Wishlist from "../models/wishlist.js";


// Add a liked cake to the wishlist
export const likeCake = async (req, res) => {
  try {
    const { userId, cakeId } = req.body;

    const wishlist = await Wishlist.findOneAndUpdate(
      { userId },
      { $addToSet: { likedCakes: cakeId } }, // Avoid duplicates
      { new: true, upsert: true } // Create a new wishlist if it doesn't exist
    );

    return res.status(200).json({
      message: 'Cake added to your wishlist successfully!',
      wishlist,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error adding cake to wishlist',
      error: error.message,
    });
  }
};

// Add a liked baker to the wishlist
export const likeBaker = async (req, res) => {
  try {
    const { userId, bakerId } = req.body;

    const wishlist = await Wishlist.findOneAndUpdate(
      { userId },
      { $addToSet: { likedBakers: bakerId } }, // Avoid duplicates
      { new: true, upsert: true } // Create a new wishlist if it doesn't exist
    );

    return res.status(200).json({
      message: 'Baker added to your wishlist successfully!',
      wishlist,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error adding baker to wishlist',
      error: error.message,
    });
  }
};

// Get the wishlist for a user
export const getWishlist = async (req, res) => {
  console.log('get working', req.params)
  try {
    const { userId } = req.params;

    const wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found' });
    }

    return res.status(200).json({ wishlist });
  } catch (error) {
    return res.status(500).json({
      message: 'Error fetching wishlist',
      error: error.message,
    });
  }
};

// Remove a cake from the wishlist
export const removeCake = async (req, res) => {
  try {
    const { userId, cakeId } = req.body;

    const wishlist = await Wishlist.findOneAndUpdate(
      { userId },
      { $pull: { likedCakes: cakeId } }, // Remove the specified cake
      { new: true }
    );

    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found' });
    }

    return res.status(200).json({
      message: 'Cake removed from wishlist successfully!',
      wishlist,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error removing cake from wishlist',
      error: error.message,
    });
  }
};

// Remove a baker from the wishlist
export const removeBaker = async (req, res) => {
  try {
    const { userId, bakerId } = req.body;

    const wishlist = await Wishlist.findOneAndUpdate(
      { userId },
      { $pull: { likedBakers: bakerId } }, // Remove the specified baker
      { new: true }
    );

    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found' });
    }

    return res.status(200).json({
      message: 'Baker removed from wishlist successfully!',
      wishlist,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error removing baker from wishlist',
      error: error.message,
    });
  }
};
