// Step 1: Install cookie-parser
// npm install cookie-parser

// Step 2: Import and use cookie-parser middleware in apiapi/index.js

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
app.use(cors({
    origin: 'https://connexting.ineshd.com', // Replace with your frontend URL
    credentials: true, // Allow cookies to be sent with the request
}));
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
            httpOnly: false,
            secure: false,
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000,
        });
        res.redirect('https://connexting.ineshd.com/dashboard');
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
    // Check for the token in cookies first
    let token = req.cookies?.authToken;

    // If not found, check the Authorization header
    if (!token && req.headers.authorization) {
        const authHeader = req.headers.authorization;
        if (authHeader.startsWith('Bearer ')) {
            token = authHeader.split(' ')[1]; // Extract token after 'Bearer '
        }
    }


    console.log(token); // Debug log for the retrieved token

    if (!token) {
        return res.status(401).json({ message: 'Not authenticated' });
    }

    try {
        // Query the database to verify the user by token
        const user = await User.findOne({ 'oAuthConnection.accessToken': token });
        if (!user) {
            return res.status(401).json({ message: 'Not authenticated' });
        }

        // Attach the user to the request object and move to the next middleware
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

        // Construct response with id inside and outside
        const response = {};
        listings.forEach((listing) => {
            response[listing.id] = {
                id: listing.id,
                ...listing.toObject()
            };
        });

        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// get own info
app.get('/user', authenticateUser, async (req, res) => {
    try {
        res.json(req.user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// edit own name
app.patch('/user', authenticateUser, async (req, res) => {
    try {
        req.user.name = req.body.name;
        await req.user.save();
        res.json(req.user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// log out (delete cookies)
app.get('/logout', (req, res) => {
    res.clearCookie('authToken');
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});