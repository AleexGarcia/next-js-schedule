// /models/studySchedule.js
import mongoose, { ObjectId } from 'mongoose';

interface ISchedule {
  userId: ObjectId
  name: string
  startDate: Date
  endDate: Date
}

const scheduleSchema = new mongoose.Schema<ISchedule>({
  name: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
}, { timestamps: true });

export default mongoose.models.Schedule || mongoose.model<ISchedule>('Schedule', scheduleSchema);
