import Wishlist from "../models/wishlist";

// Add a liked cake to the wishlist
exports.likeCake = async (req, res) => {
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
exports.likeBaker = async (req, res) => {
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
