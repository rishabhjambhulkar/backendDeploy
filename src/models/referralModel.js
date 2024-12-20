import mongoose from "mongoose";

const referralSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  referredTo: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  maxReferrals: {
    type: Number,
    default: 5 // Default max referrals per user
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});


const Referral = mongoose.model('Referral', referralSchema);

export default Referral;