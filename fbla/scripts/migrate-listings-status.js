const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

// Define the schema here since we can't import from TypeScript files
const listingSchema = new mongoose.Schema({
    name: { type: String, required: true },
    hours: { type: Number, required: true },
    pay: { type: Number, required: true },
    tags: [String],
    qualifications: [String],
    age: Number,
    photos: [String],
    description: { type: String, required: true },
    applications: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        message: { type: String, required: true },
    }],
    status: { type: Number, default: 0 }, // 0: pending, 1: accepted, -1: rejected
});

const Listing = mongoose.models.Listing || mongoose.model('Listing', listingSchema);

async function migrateLisitingsStatus() {
    try {
        // Connect to MongoDB
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');

        // Update all listings that don't have a status field
        const result = await Listing.updateMany(
            { status: { $exists: false } }, // find documents where status doesn't exist
            { $set: { status: 0 } } // set status to 0 (pending)
        );

        console.log(`Updated ${result.modifiedCount} listings`);
        console.log('Migration completed successfully');
    } catch (error) {
        console.error('Migration failed:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
        process.exit(0);
    }
}

// Run the migration
migrateLisitingsStatus(); 