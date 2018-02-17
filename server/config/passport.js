const passport = require('passport');
const jwt = require('passport-jwt');
const localStrategy = require('passport-local');
const UserModel = require('../../db/schemas/user');

const jwtStrategy = jwt.Strategy;
const extractJwt = jwt.ExtractJwt;
const localOptions = { usernameField: 'email' };

const localLogin = new localStrategy(localOptions, (email, password, done, ) => {
    UserModel.authenticate(email, password, (err, user) => {
        if (err) return done(err);
        if (user) return done(null, user);
    });
});

const jwtOptions = {
    // Telling Passport to check authorization headers for JWT
    jwtFromRequest: extractJwt.fromAuthHeaderWithScheme('jwt'),
    // Telling Passport where to find the secret
    secretOrKey: String(process.env.SECRET)
};

// Setting up JWT login strategy
const jwtLogin = new jwtStrategy(jwtOptions, (payload, done) => {
    UserModel.findById(payload._id).exec().then(user => {
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    }).catch(err => done(err, false));
});

passport.use(jwtLogin);
passport.use(localLogin);