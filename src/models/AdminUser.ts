import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IAdminUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl?: string;
  passwordHash: string;
  role: 'Super Admin' | 'Registrar' | 'Program Manager' | 'Support';
  status: 'Active' | 'Inactive' | 'Pending';
  lastLogin?: Date;
  fullName: string; // virtual
  createdAt: Date;
  updatedAt: Date;
}

const AdminUserSchema = new Schema<IAdminUser>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  avatarUrl: { type: String },

  passwordHash: { type: String, required: true },

  role: {
    type: String,
    enum: ['Super Admin', 'Registrar', 'Program Manager', 'Support'],
    default: 'Support',
  },

  status: {
    type: String,
    enum: ['Active', 'Inactive', 'Pending'],
    default: 'Pending',
  },

  lastLogin: { type: Date },
}, { timestamps: true });

// Virtual for full name to make UI rendering easier
AdminUserSchema.virtual('fullName').get(function (this: IAdminUser) {
  return `${this.firstName} ${this.lastName}`;
});

const AdminUser: Model<IAdminUser> = mongoose.models.AdminUser || mongoose.model<IAdminUser>('AdminUser', AdminUserSchema);

export default AdminUser;
