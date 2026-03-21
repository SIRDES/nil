import mongoose, { Schema, Document, Model, Types } from 'mongoose';

export interface IMessage extends Document {
 name: string;
 email: string;
 phone?: string;
 subject: string;
 messageBody: string;
 source: string;
 relatedProgram?: string;
 ticketNumber: string;
 status: 'New' | 'Read' | 'Resolved';
 resolvedBy?: Types.ObjectId;
 createdAt: Date;
 updatedAt: Date;
}

const MessageSchema = new Schema<IMessage>({
 name: { type: String, required: true },
 email: { type: String, required: true },
 phone: { type: String },

 subject: { type: String, required: true },
 messageBody: { type: String, required: true },

 source: { type: String, default: 'Contact Form' },
 relatedProgram: { type: String },

 ticketNumber: { type: String, unique: true },
 status: {
 type: String,
 enum: ['New', 'Read', 'Resolved'],
 default: 'New',
 },

 resolvedBy: {
 type: Schema.Types.ObjectId,
 ref: 'AdminUser',
 },
}, { timestamps: true });

// Pre-save hook to generate a random ticket number if one doesn't exist
MessageSchema.pre('save', function () {
 if (!this.ticketNumber) {
 const randomNum = Math.floor(1000 + Math.random() * 9000);
 this.ticketNumber = `TKT-${randomNum}`;
 }
});

const Message: Model<IMessage> = mongoose.models.Message || mongoose.model<IMessage>('Message', MessageSchema);

export default Message;
