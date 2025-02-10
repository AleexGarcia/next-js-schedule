// /models/review.js
import mongoose, { ObjectId } from 'mongoose';

interface IReview {
  themeId: ObjectId
  reviewDate: Date
  status: 'pending' | 'completed'
}

const reviewSchema = new mongoose.Schema<IReview>({
  themeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Theme', required: true },
  reviewDate: { type: Date, required: true },
  status: {
    type: String,
    enum: ['pending', 'completed'],
    default: 'pending',
  }
}, { timestamps: true });

export default mongoose.models.Review || mongoose.model<IReview>('Review', reviewSchema);
