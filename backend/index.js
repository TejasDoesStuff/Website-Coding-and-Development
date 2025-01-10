// Step 1: Install cookie-parser
// npm install cookie-parser

// Step 2: Import and use cookie-parser middleware in backend/index.js

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import session from 'express-session';
import passport from './passport/passportConfig.js';
import { Listing } from './models/listingConfig.js';
import { User, Recruiter, Student } from './models/userModel.js';
import crypto from 'crypto';
import cookieParser from 'cookie-parser'; // Import cookie-parser

const app = express();
const port = 8080;

const sessionSecret = crypto.randomBytes(64).toString('hex');
console.log(sessionSecret);

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser()); // Use cookie-parser middleware
app.use(session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// MongoDB connection
mongoose.connect('mongodb+srv://inesh:rA5hSJDKr5E7Tj7F@main-db.6l0no.mongodb.net/?retryWrites=true&w=majority&appName=main-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile'] })
);

app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        const token = req.user.oAuthConnection.accessToken;
        res.cookie('authToken', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict',
            maxAge: 24 * 60 * 60 * 1000,
        });
        res.redirect('http://localhost:3000');
    }
);

app.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
});

const authenticateUser = async (req, res, next) => {
    const token = req.cookies?.authToken; // Retrieve the token from cookies
    console.log(token);
    if (!token) {
        return res.status(401).json({ message: 'Not authenticated' });
    }

    try {
        const user = await User.findOne({ 'oAuthConnection.accessToken': token });
        if (!user) {
            return res.status(401).json({ message: 'Not authenticated' });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const isRecruiter = (req, res, next) => {
    if (req.user.role !== 'recruiter') {
        return res.status(403).json({ message: 'Forbidden: Only recruiters can post listings' });
    }
    next();
};

app.post('/listings', authenticateUser, isRecruiter, async (req, res) => {
    try {
        const listing = new Listing(req.body);
        await listing.save();
        res.json(listing);
        const recruiter = await Recruiter.findById(req.user._id);
        recruiter.listings.push(listing);
        await recruiter.save();
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.get('/listings', authenticateUser, async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        if (limit > 16) {
            return res.status(400).json({ message: 'Limit too high' });
        }
        if (page < 1) {
            return res.status(400).json({ message: 'Invalid page number' });
        }
        const startIndex = (page - 1) * limit;
        const listings = await Listing.find().limit(limit).skip(startIndex);
        res.json(listings);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});