// /models/review.js
import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  themeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Theme', required: true },
  reviewType: { 
    type: String, 
    enum: ['1_week', '1_month', '3_months'],
    required: true,
  },
  reviewDate: { type: Date, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'completed'],
    default: 'pending',
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.Review || mongoose.model('Review', reviewSchema);
