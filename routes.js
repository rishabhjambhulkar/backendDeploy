import express from 'express';

import { createReferral, applyCoupon } from './src/controllers/referralController.js';
import { addUser } from './src/controllers/userController.js';
import {
    likeCake,
    likeBaker,
    getWishlist,
    removeCake,
    removeBaker,
  } from './src/controllers/wishlistController.js';

import { addAddress, getUserAddresses, updateAddress, deleteAddress } from './src/controllers/addressController.js';

const router = express.Router();
// Simple route
router.get('/', (req, res) => {
    res.send('Core Service Started');
});



router.post('/user', addUser);

// Route to create a referral
router.post('/create', createReferral);

// // Route to validate a referral code
router.post('/applyCoupon', applyCoupon);

// // Route to get all referrals by a user
// router.get('/user/:userId', getUserReferrals);



// Route to add cakes to the wishlist
router.post('/like-cake', likeCake);

// Route to add bakers to the wishlist
router.post('/like-baker', likeBaker);

// Route to fetch a user's wishlist
router.get('/getWishlist/:userId', getWishlist);

// Route to remove a cake from the wishlist
router.delete('/remove-cake', removeCake);

// Route to remove a baker from the wishlist
router.delete('/remove-baker', removeBaker);



// Define routes with controller methods
router.post('/create-address', addAddress);
router.get('/get-addresses/:userId', getUserAddresses);
router.put('/update-address/:id', updateAddress);
router.delete('/remove-address/:id', deleteAddress);

export default router;
