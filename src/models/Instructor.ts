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
    avatarPublicId?: string;
    assignedPrograms: Types.ObjectId[];
    availabilityStatus: "full-time" | "part-time" | "contract";
    showProfilePublic: boolean;
    isActive: boolean;
    averageRating: number;
    reviewCount: number;
    createdAt: Date;
    updatedAt: Date;
}

const InstructorSchema = new Schema<IInstructor>({
    firstName: { type: String, required: true, trim: true, lowercase: true },
    lastName: { type: String, required: true, trim: true, lowercase: true },
    professionalTitle: { type: String, required: true, trim: true, lowercase: true },
    bio: { type: String, maxlength: 500, trim: true },

    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    phone: { type: String, trim: true },
    linkedInUrl: { type: String, trim: true },
    location: { type: String, trim: true },

    avatarUrl: { type: String, trim: true },
    avatarPublicId: { type: String, trim: true },

    assignedPrograms: [{
        type: Schema.Types.ObjectId,
        ref: 'Program',
    }],

    availabilityStatus: {
        type: String,
        enum: ["full-time", "part-time", "contract"],
        default: 'full-time',
    },

    showProfilePublic: {
        type: Boolean,
        default: true,
    },

    isActive: {
        type: Boolean,
        default: true,
    },

    averageRating: { type: Number, default: 0, min: 0, max: 5 },
    reviewCount: { type: Number, default: 0 },
}, { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// full-time" | "part-time" | "contract


// Virtual for full name to make UI rendering easier
InstructorSchema.virtual('fullName').get(function (this: IInstructor) {
    return `${this.firstName?.toUpperCase()} ${this.lastName?.toUpperCase()}`;
});


const Instructor: Model<IInstructor> = mongoose.models.Instructor || mongoose.model<IInstructor>('Instructor', InstructorSchema);

export default Instructor;
