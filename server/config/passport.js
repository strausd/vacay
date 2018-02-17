const passport = require('passport');
const jwt = require('passport-jwt');
const localStrategy = require('passport-local');
const UserModel = require('../../db/schemas/user');
const config = require('./main');

const jwtStrategy = jwt.Strategy;
const extractJwt = jwt.ExtractJwt;
const localOptions = { usernameField: 'email' };

const localLogin = new localStrategy(localOptions, (email, password, done) => {
    UserModel.authenticate(email, password, (err, user) => {
        if (err) return done(err);
        if (user) return done(null, user);
    });
});

const jwtOptions = {
    // Telling Passport to check authorization headers for JWT
    jwtFromRequest: extractJwt.fromAuthHeaderWithScheme('jwt'),
    // Telling Passport where to find the secret
    secretOrKey: config.secret
};

// Setting up JWT login strategy
const jwtLogin = new jwtStrategy(jwtOptions, (payload, done) => {
    console.log('======================================');
    console.log(payload);
    User.findById(payload._id, (err, user) => {
        if (err) { return done(err, false); }

        if (user) {
            done(null, user);
        } else {
            done(null, false);
        }
    });
});

passport.use(jwtLogin);
passport.use(localLogin);