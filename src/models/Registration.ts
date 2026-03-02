import mongoose, { Schema, Document, Model, Types } from 'mongoose';

export interface IRegistration extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  programId: Types.ObjectId;
  dateOfBirth?: Date;
  studentId?: string;
  status: 'Pending' | 'Enrolled' | 'Waitlist' | 'Rejected';
  paymentReceived: boolean;
  internalNotes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const RegistrationSchema = new Schema<IRegistration>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  location: { type: String, required: true },

  programId: {
    type: Schema.Types.ObjectId,
    ref: 'Program',
    required: true,
  },

  dateOfBirth: { type: Date },

  studentId: { type: String },
  status: {
    type: String,
    enum: ['Pending', 'Enrolled', 'Waitlist', 'Rejected'],
    default: 'Pending',
  },
  paymentReceived: { type: Boolean, default: false },
  internalNotes: { type: String },
}, { timestamps: true });

const Registration: Model<IRegistration> = mongoose.models.Registration || mongoose.model<IRegistration>('Registration', RegistrationSchema);

export default Registration;
