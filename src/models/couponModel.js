import mongoose from "mongoose";

const couponSchema = new mongoose.Schema({
    code: {
      type: String,
      unique: true,
      required: true
    },
    discount: {
      type: Number,
      required: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    expiryDate: {
      type: Date,
      required: true
    },
    isUsed: {
      type: Boolean,
      default: false
    },
    minimumOrderSize: {
      type: Number,
      default: 800
    }
  });
  
  const Coupon = mongoose.model('Coupon', couponSchema);

  export default Coupon;