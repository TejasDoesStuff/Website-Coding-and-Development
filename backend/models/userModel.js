import mongoose from "mongoose";
import { Listing } from './listingConfig.js';
const oAuthConnectionSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    accessToken: {
        type: String,
        required: true,
    },
    refreshToken: {
        type: String,
    },
});

const userSchema = new mongoose.Schema({
    accountId: {
        type: Number,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
        unique: false,
    },
    role: {
        type: String,
        enum: ['student', 'recruiter'],
        required: true,
    },
    oAuthConnection: {
        type: oAuthConnectionSchema,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    tokens: [String],
    profileImage: {
        type: String,
        default: 'default.jpg',
    },
}, { discriminatorKey: 'role' });

const User = mongoose.model("User", userSchema);

const studentSchema = new mongoose.Schema({
    age: {
        type: Number,
        required: true,
    },
    school: {
        type: String,
        required: true,
    },
    preferences: {
        type: [String],
        required: true,
    },
    qualifications: {
        type: [String],
        required: true,
    },
    favListings: {
        type: [Number],
        required: true,
    },
});

const recruiterSchema = new mongoose.Schema({
    listings: {
        type: [Listing.schema],
        required: true,
        default: [],
    },
});

const Student = User.discriminator('student', studentSchema);
const Recruiter = User.discriminator('recruiter', recruiterSchema);

export { User, Student, Recruiter };