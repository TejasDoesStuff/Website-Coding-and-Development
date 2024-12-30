import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import axios from 'axios';
import session from 'express-session';
import passport from './passport/passportConfig.js'; // Import passport configuration

import { Listing } from './models/listingConfig.js'; // Import Listing model
import { User, Student, Recruiter } from './models/userModel.js'; // Import User model

const app = express();
const port = 8000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(session({
    secret: 'your_secret_key',
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
        // Successful authentication, redirect home.
        res.redirect('/');
    }
);

app.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

app.get('/profile', (req, res) => {
    if (req.isAuthenticated()) {
        res.json(req.user);
    } else {
        res.status(401).json({ message: 'Not authenticated' });
    }
});



app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
