const passport = require("passport")
const JwtStrategy = require('passport-jwt').Strategy,
      ExtractJwt = require('passport-jwt').ExtractJwt
const jwtKey = require('../jwtKey.json')
const options = {}

options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
options.secretOrKey = jwtKey.key

module.exports = passport.use(new JwtStrategy(options, (payload, done) => {
    let now = Date.now() / 1000;
    if(payload.exp > now) {
        console.log("Successful JWT auth")
        done(null, payload)
    } else {
        console.log("Wrong JWT auth")
        done(null, false)
    }
  }))