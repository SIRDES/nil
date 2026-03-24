import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProgram extends Document {
  name: string;
  description: string;
  category?: string;
  duration: string;
  difficultyLevel?: 'Beginner' | 'Intermediate' | 'Advanced';
  curriculumHighlights: string[];
  price: number;
  isFinancialAidEligible: boolean;
  isRegistrationOpen: boolean;
  isPubliclyVisible: boolean;
  bannerUrl?: string;
  bannerPublicId?: string;
  activeStudents: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProgramSchema = new Schema<IProgram>({
  name: { type: String, required: true, trim: true, uppercase: true, unique: true },
  description: { type: String, required: true, trim: true },
  category: { type: String, trim: true },
  duration: { type: String, required: true },
  difficultyLevel: { type: String, required: true, enum: ['Beginner', 'Intermediate', 'Advanced'] },

  curriculumHighlights: [{ type: String, trim: true }],

  price: { type: Number, required: true },
  isFinancialAidEligible: { type: Boolean, default: false },

  isRegistrationOpen: { type: Boolean, default: true },
  isPubliclyVisible: { type: Boolean, default: true },

  bannerUrl: { type: String },
  bannerPublicId: { type: String },

  activeStudents: { type: Number, default: 0 },
}, { timestamps: true });

const Program: Model<IProgram> = mongoose.models.Program || mongoose.model<IProgram>('Program', ProgramSchema);

export default Program;
