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
    name: {
        type: String,
        required: true,
    },
    hours: {
        type: Number,
        required: true,
    },
    pay: {
        type: Number,
        required: true,
    },
    tags: {
        type: [String],
        required: false,
    },
    qualifications: {
        type: [String],
        required: false,
    },
    age: {
        type: Number,
        required: false,
    },
    photos: {
        type: [String],
        required: false,
    },
    desc: {
        type: String,
        required: true,
    },
    applications: [applicationSchema],
});

const Listing = mongoose.model("Listing", listingSchema);

export { Listing };