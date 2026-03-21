import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ICounter extends Document<string> {
 _id: string; // The name of the sequence, e.g., 'studentId'
 seq: number; // The current value of the sequence
}

const CounterSchema = new Schema<ICounter>({
 _id: { type: String, required: true },
 seq: { type: Number, default: 0 },
});

const Counter: Model<ICounter> = mongoose.models.Counter || mongoose.model<ICounter>('Counter', CounterSchema);

export default Counter;
