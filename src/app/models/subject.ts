// /models/subject.js
import mongoose, { ObjectId } from 'mongoose';

interface ISubject {
  subjectId: ObjectId
  name: string
}

const subjectSchema = new mongoose.Schema<ISubject>({
  subjectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
  name: { type: String, required: true },
}, { timestamps: true });

export default mongoose.models.Subject || mongoose.model<ISubject>('Subject', subjectSchema);
