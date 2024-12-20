
import Referral from '../models/referralModel.js';
import User from '../models/UserModel.js';
import Coupon from '../models/couponModel.js';
import dayjs from 'dayjs';


// Controller for handling referrals
export const createReferral = async (req, res) => {
  try {
    const { email, phone,userId } = req.body;
    // const userId = req.payload.user_id; // Extract userId from JWT or session

    // Check if the referrer exists in the Referral model
    let referrer = await Referral.findOne({ userId }).populate('userId');
    if (!referrer) {
      // Create a new referral record for the referrer if it doesn't exist
      referrer = new Referral({ userId, referredTo: [] });
      await referrer.save();
    }

    // Check max referrals
    if (referrer.referredTo.length >= referrer.maxReferrals) {
      return res.status(400).json({ error: 'Maximum referrals reached' });
    }

    // Find the referred user by email or phone
    const referee = await User.findOne({
      $or: [{ email }, { phone }]
    });

    if (!referee) {
      return res.status(404).json({ error: 'Referred user not found' });
    }

    if (referrer.referredTo.includes(referee._id)) {
      return res.status(400).json({ error: 'User already referred' });
    }

    // Add referee to referredTo list
    referrer.referredTo.push(referee._id);
    await referrer.save();

    // Generate coupons for both referrer and referee
    const discount = 100;
    const expiryDate = dayjs().add(2, 'month').toDate();

    const referrerCoupon = new Coupon({
      code: generateUniqueCode(),
      discount,
      userId: referrer.userId,
      expiryDate
    });

    const refereeCoupon = new Coupon({
      code: generateUniqueCode(),
      discount,
      userId: referee._id,
      expiryDate
    });

    await referrerCoupon.save();
    await refereeCoupon.save();

    // Send email to the referee
    // await sendEmail(
    //   referee.email,
    //   'Referral Coupon Received',
    //   `Congratulations! You have received a referral coupon code ${refereeCoupon.code} valid until ${expiryDate}.`
    // );

    res.status(200).json({
      message: 'Referral created successfully',
      referrerCoupon: referrerCoupon.code,
      refereeCoupon: refereeCoupon.code
    });
  } catch (error) {
    console.error('Error creating referral:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// Utility function to generate a unique coupon code
function generateUniqueCode() {
  return `COUPON-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
}





export const applyCoupon = async (req, res) => {
  try {
    const { couponCode, userId, originalAmount } = req.body;

    // Check if the coupon exists and is valid
    const coupon = await Coupon.findOne({ code: couponCode });
    if (!coupon || coupon.expiryDate < new Date() || coupon.isUsed) {
      return res.status(404).json({ error: 'Invalid or expired coupon' });
    }

    // Check if the minimum order size condition is met
    if (originalAmount < coupon.minimumOrderSize) {
      return res.status(400).json({ error: `Minimum order size of ${coupon.minimumOrderSize} is required` });
    }

    // Associate the coupon with the user
    coupon.userId = userId;
    coupon.isUsed = true;  // Mark coupon as used
    await coupon.save();

    res.status(200).json({
      message: 'Coupon applied successfully',
      coupon: coupon,
      userId: coupon.userId,
      discountedAmount: originalAmount-coupon.discount
    });
  } catch (error) {
    console.error('Error applying coupon:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};