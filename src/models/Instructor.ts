import mongoose, { Schema, Document, Model, Types } from 'mongoose';

export interface IInstructor extends Document {
  firstName: string;
  lastName: string;
  professionalTitle: string;
  bio?: string;
  email: string;
  phone?: string;
  linkedInUrl?: string;
  location?: string;
  avatarUrl?: string;
  assignedPrograms: Types.ObjectId[];
  availabilityStatus: 'Active' | 'On Leave';
  averageRating: number;
  reviewCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const InstructorSchema = new Schema<IInstructor>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  professionalTitle: { type: String, required: true },
  bio: { type: String, maxlength: 500 },

  email: { type: String, required: true, unique: true },
  phone: { type: String },
  linkedInUrl: { type: String },
  location: { type: String },

  avatarUrl: { type: String },

  assignedPrograms: [{
    type: Schema.Types.ObjectId,
    ref: 'Program',
  }],

  availabilityStatus: {
    type: String,
    enum: ['Active', 'On Leave'],
    default: 'Active',
  },

  averageRating: { type: Number, default: 0, min: 0, max: 5 },
  reviewCount: { type: Number, default: 0 },
}, { timestamps: true });

const Instructor: Model<IInstructor> = mongoose.models.Instructor || mongoose.model<IInstructor>('Instructor', InstructorSchema);

export default Instructor;
