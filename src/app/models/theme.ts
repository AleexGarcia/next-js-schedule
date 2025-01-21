// /models/theme.js
import mongoose from 'mongoose';

const themeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  subjectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
  studyStatus: {
    type: String,
    enum: ['not_studied', 'in_progress', 'reviewed'],
    default: 'not_studied',
  },
  reviewDates: [{ type: Date }],
},{timestamps: true});

export default mongoose.models.Theme || mongoose.model('Theme', themeSchema);
