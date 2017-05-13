const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const config = require('../config');
const LocalStrategy = require('passport-local');

// Setup options for JWT Strategy
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
};

// Create local strategy
const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy( localOptions, function (email, password, done) {
    // Verify this username 
    User.findOne({ email: email }, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        // Compare passwords 
        user.comparePassword(password, function (err, isMatch) {
            if (err) { return done(err); }
            if (!isMatch) { return done(null, false); }
            return done(null, user);
        })
    })
    // if it is the corrent username and password
    // otherwise,
})

// Create JWT Strategy
const jwtLogin = new JwtStrategy(jwtOptions, function (payload, done) {
    // See if the user ID in the payload exist in our database
    User.findById(payload.sub, function (err, user) {
        if (err) { return done(err, false); }
        if (user) {
            //if it does, call 'done' with that user object.
            done(null, user);
        } else {
            //otherwise, call done without a user object.
            done(null, false);
        }
    })

});
// Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);