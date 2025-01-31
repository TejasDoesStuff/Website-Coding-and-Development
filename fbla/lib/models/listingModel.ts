import mongoose, { Schema, Document } from 'mongoose';

interface IApplication {
  user: mongoose.Types.ObjectId;
  message: string;
  status: number; // 0: pending, 1: accepted, -1: rejected
}

export interface IListing extends Document {
  name: string;
  hours: number;
  pay: number;
  tags: string[];
  qualifications: string[];
  age?: number;
  photos: string[];
  description: string;
  applications: IApplication[];
  status: number; // 0: pending, 1: accepted, -1: rejected
  recruiter: mongoose.Types.ObjectId;
}

const applicationSchema = new Schema<IApplication>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  message: { type: String, required: true },
  status: { type: Number, default: 0 }
});

const listingSchema = new Schema<IListing>({
  name: { type: String, required: true },
  hours: { type: Number, required: true },
  pay: { type: Number, required: true },
  tags: [String],
  qualifications: [String],
  age: Number,
  photos: [String],
  description: { type: String, required: true },
  applications: [applicationSchema],
  status: { type: Number, default: 0 }, // 0: pending, 1: accepted, -1: rejected
  recruiter: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

export const Listing = mongoose.models.Listing || mongoose.model<IListing>('Listing', listingSchema); 