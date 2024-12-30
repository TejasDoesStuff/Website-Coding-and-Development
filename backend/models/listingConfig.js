import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
});

const listingSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    tags: {
        type: [String],
        required: true,
    },
    qualifications: {
        type: [String],
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    photos: {
        type: [String],
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    applications: [applicationSchema],
});

const Listing = mongoose.model("Listing", listingSchema);

export { Listing };