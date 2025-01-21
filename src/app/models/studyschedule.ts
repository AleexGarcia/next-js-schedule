// /models/studySchedule.js
import mongoose from 'mongoose';

const studyScheduleSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subject' }],
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
},{timestamps:true});

export default mongoose.models.StudySchedule || mongoose.model('StudySchedule', studyScheduleSchema);
