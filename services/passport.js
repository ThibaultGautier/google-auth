const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const GoogleUsers = require('./../models/GoogleUsers')

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    GoogleUsers.findById(id)
        .then((user) => {
            done(null, user)
        })
})



passport.use(new GoogleStrategy({
    clientID: "706088616594-u3a63o6vgm4c30g58rqh0ib65qjq54il.apps.googleusercontent.com",
    clientSecret: "avuIoVXzPNkR2Q1DpxtkZaWW",
    callbackURL: "/auth/google/callback"


}, (accessToken, refreshToken, profile, done) => {
    // console.log('Access token : ', accessToken)
    // console.log('Refresh token : ', refreshToken)
    // console.log('profile : ', profile)

    GoogleUsers.findOne({ googleId: profile.id })
        .then((user) => {

            if (user) {

                console.log('utilisateur déjà enregistré')
                done(null, user)
            }
            else {
                new GoogleUsers({ googleId: profile.id }).save()
                    .then((user) => {
                        done(null, user)
                    })
            }

        })
}))