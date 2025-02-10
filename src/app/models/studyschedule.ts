// /models/studySchedule.js
import mongoose, { ObjectId } from 'mongoose';

interface ISchedule {
  userId: ObjectId
  subjects: Array<ObjectId>
  startDate: Date,
  endDate: Date
}

const scheduleSchema = new mongoose.Schema<ISchedule>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subject' }],
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
},{timestamps:true});

export default mongoose.models.StudySchedule || mongoose.model<ISchedule>('Schedule', scheduleSchema);
