import mongoose, { Schema, Document, Model, Types } from 'mongoose';
import Counter from './Counter';

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
    firstName: { type: String, required: true, trim: true, lowercase: true },
    lastName: { type: String, required: true, trim: true, lowercase: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },

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

RegistrationSchema.pre<IRegistration>('save', async function () {
    if (this.isNew && !this.studentId) {
        const counter = await Counter.findByIdAndUpdate(
            { _id: 'studentId' },
            { $inc: { seq: 1 } },
            { returnDocument: 'after', upsert: true }
        );
        // Pad to 4 digits (e.g., 0001)
        this.studentId = String(counter?.seq || 1).padStart(4, '0');
    }
});

const Registration: Model<IRegistration> = mongoose.models.Registration || mongoose.model<IRegistration>('Registration', RegistrationSchema);

export default Registration;
