import passport from 'passport';
import LocalStrategy from 'passport-local';
import session from 'express-session';
import db from './db.js'
import CryptoJS from 'crypto-js';
import Bcrypt from 'bcrypt';

class Authorization {
    constructor(app) {
        app.use(session({
            secret: "secret",
            resave: false,
            saveUninitialized: true,
            cookie: { secure: false }
        }));

        app.use(passport.initialize()); // init passport on every route call
        app.use(passport.session());
        passport.use(new LocalStrategy(this.verifyIdentity));

        passport.serializeUser((user, done) => done(null, user));
        passport.deserializeUser((user, done) => done(null, user));
    }

  async verifyIdentity(username, password, done) {
    const key = "River Plate";
const user = CryptoJS.AES.decrypt(username, key).toString(CryptoJS.enc.Utf8);
const pass = CryptoJS.AES.decrypt(password, key).toString(CryptoJS.enc.Utf8);
const query = { user: user };
const collection = db.collection("users");
const usersFromDB = await collection.findOne(query);
if (!usersFromDB) {
return done(new Error('Invalid username or password'));
}
const isMatch = await Bcrypt.compare(pass, usersFromDB.password);
if (!isMatch) {
return done(new Error('Invalid password or password'));
}
console.log("Login OK");
return done(null, usersFromDB);
}

    checkAuthenticated(req, res, next) {
        if (req.isAuthenticated()) { 
            return next(); 
        }
        res.redirect("/login");
    }

}

export default Authorization;

