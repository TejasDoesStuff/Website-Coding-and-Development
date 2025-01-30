import mongoose, { Schema, Document } from 'mongoose';

interface IOAuthConnection {
  id: string;
  accessToken: string;
  refreshToken?: string;
}

export interface IUser extends Document {
  accountId: number;
  name: string;
  role: 'student' | 'recruiter';
  oAuthConnection: IOAuthConnection;
  createdAt: Date;
  tokens: string[];
  profileImage: string;
}

const oAuthConnectionSchema = new Schema<IOAuthConnection>({
  id: { type: String, required: true },
  accessToken: { type: String, required: true },
  refreshToken: String,
});

const userSchema = new Schema<IUser>({
  accountId: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  role: { type: String, enum: ['student', 'recruiter'], required: true },
  oAuthConnection: { type: oAuthConnectionSchema, required: true },
  createdAt: { type: Date, default: Date.now },
  tokens: [String],
  profileImage: { type: String, default: 'default.jpg' },
}, { discriminatorKey: 'role' });

export const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema); 