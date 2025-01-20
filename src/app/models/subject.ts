// /models/subject.js
import mongoose from 'mongoose';

const subjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
},{timestamps:true});

export default mongoose.models.Subject || mongoose.model('Subject', subjectSchema);
