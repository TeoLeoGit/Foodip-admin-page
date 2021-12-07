const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

const Admin = require('../models/admin.model')

passport.use(new localStrategy({
    usernameField: 'username',
    passwordField: 'password',
},
    function (username, password, done) {
        console.log(username, password)
        Admin.getAdmin({ username: username})
            .then(admin => {
                //if (err) { return done(err); }
                if (!admin) {
                    return done(null, false, { message: 'Incorrect username.' });
                }
                if (!validPassword(admin, password)) {
                    return done(null, false, { message: 'Incorrect password.' });
                }
                console.log(admin)
                return done(null, admin);
            })
            .catch(err => { return done(err); });
    }
))

validPassword = function( admin, pwd ) {
    return ( admin.password === pwd );
}

passport.serializeUser(function(user, done) {
    done(null, user._id);
});

passport.deserializeUser(function(id, done) {
    Admin.getAdminById(id)
        .then(admin => {done(null, admin)})
        .catch(err => { done(null, false)})

    //   done(err, user);

});

module.exports = passport;