// /models/subject.js
import mongoose, { ObjectId } from 'mongoose';

interface ISubject {
  name: string
  scheduleId: ObjectId
}

const subjectSchema = new mongoose.Schema<ISubject>({
  name: { type: String, required: true },
  scheduleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Schedule', required: true }
}, { timestamps: true });

export default mongoose.models.Subject || mongoose.model<ISubject>('Subject', subjectSchema);
