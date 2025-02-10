// /models/theme.js
import mongoose, { ObjectId } from 'mongoose';

interface ITheme {
  name: string
  subject: ObjectId
  studyStatus: 'not_studied' | 'in_progress' | 'reviewed'
  reviews?: {
    first?: ObjectId,
    second?: ObjectId,
    third?: ObjectId,
  }
}


const themeSchema = new mongoose.Schema<ITheme>({
  name: { type: String, required: true },
  subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
  studyStatus: {
    type: String,
    enum: ['not_studied', 'in_progress', 'reviewed'],
    default: 'not_studied',
  },
  reviews: {
    first: { type: mongoose.Schema.Types.ObjectId, ref: 'Review' },
    second: { type: mongoose.Schema.Types.ObjectId, ref: 'Review' },
    third: { type: mongoose.Schema.Types.ObjectId, ref: 'Review' },
  },
}, { timestamps: true });

export default mongoose.models.Theme || mongoose.model<ITheme>('Theme', themeSchema);
