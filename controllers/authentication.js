const User = require('../models/user');
const jwt = require('jwt-simple');
const config = require('../config');
function tokenForUser(user) {
    const timestamp = new Date().getTime();
    return jwt.encode({ sub: user.id, iat: timestamp }, config.secret)
}
exports.signin = function (req, res, next) {
    // User has already had thier email and password auth'd
    // We just need to give them a token
    res.send({ token: tokenForUser(req.user) });
    // res.send({token: tokenForUser(req.) })
}
exports.signup = function (req, res, next) {
    // see if a user with the given email exists
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        return res.status(422).send({ error: 'password or mail are missing  ...' });
    }
    // if a user with email does exist, return an error
    User.findOne({ email: email }, function (err, existingUser) {
        if (existingUser) {
            return res.status(422)
                .send({ error: 'mail already exist ...' });
        }
        const user = new User({
            email: email,
            password, password
        })
        user.save(function (err) {
            if (err) { return next(err); }
            // if a user with email does NOT exist, create and save user record
            res.json({ token: tokenForUser(user) });
        })
    })

    // respond to request indicating the user was created
}