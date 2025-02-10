// /models/studySession.js
import mongoose, { ObjectId } from 'mongoose';

interface IStudySession {
  userId: ObjectId
  themeId: ObjectId
  studyDate: Date
  status: 'not_studied' | 'in_progress' | 'completed'
}


const studySessionSchema = new mongoose.Schema<IStudySession>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  themeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Theme', required: true },
  studyDate: { type: Date, required: true },
  status: {
    type: String,
    enum: ['not_studied', 'in_progress', 'completed'],
    default: 'not_studied',
  }
}, { timestamps: true });

export default mongoose.models.StudySession || mongoose.model<IStudySession>('StudySession', studySessionSchema);
