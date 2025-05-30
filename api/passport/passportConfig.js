import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { User } from '../models/userModel.js';

passport.use(new GoogleStrategy({
        clientID: '722979721080-rvskmdgcqj775v89fsnssfje3eultja3.apps.googleusercontent.com',
        clientSecret: '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',
        callbackURL: 'https://connexting.ineshd.com/api/auth/google/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
        try {
            let user = await User.findOne({ accountId: profile.id });

            if (!user) {
                user = new User({
                    accountId: profile.id,
                    name: profile.displayName,
                    profileImage: profile.photos[0].value,
                    role: 'recruiter',
                    oAuthConnection: {
                        id: profile.id,
                        accessToken,
                        refreshToken,
                    }
                });
                await user.save();
            } else {
                user.oAuthConnection.accessToken = accessToken;
                user.oAuthConnection.refreshToken = refreshToken;
                await user.save();
            }

            return done(null, user);
        } catch (error) {
            return done(error, null);
        }
    }
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

export default passport;