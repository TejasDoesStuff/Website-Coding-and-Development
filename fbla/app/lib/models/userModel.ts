import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String, default: 'No description provided' },
  profileImage: { type: String, default: '/default-avatar.png' },
  age: { type: Number, default: 0 },
  school: { type: String, default: 'Not specified' },
  preferences: { type: [String], default: [] },
  qualifications: { type: [String], default: [] },
  favoriteListings: { type: [mongoose.Schema.Types.ObjectId], default: [] },
  role: { type: String, enum: ['none', 'user', 'recruiter', 'admin'], default: 'none' }
});

export const User = mongoose.models.User || mongoose.model('User', userSchema); 