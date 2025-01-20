// /models/studySession.js
import mongoose from 'mongoose';

const studySessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  themeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Theme', required: true },
  studyDate: { type: Date, required: true },
  status: { 
    type: String, 
    enum: ['not_studied', 'in_progress', 'completed'],
    default: 'not_studied',
  }
},{timestamps:true});

export default mongoose.models.StudySession || mongoose.model('StudySession', studySessionSchema);
