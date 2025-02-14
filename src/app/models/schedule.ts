
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

scheduleSchema.virtual('subjects', {
  ref: 'Subject',
  localField: '_id',
  foreignField: 'scheduleId'
})

scheduleSchema.set('toJSON', { virtuals: true });
scheduleSchema.set('toObject', { virtuals: true });

export default mongoose.models.Schedule || mongoose.model<ISchedule>('Schedule', scheduleSchema,'schedules');
