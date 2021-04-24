const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;

const User = require("./models/User");

const cookieExtractor = (req) => {
	let token = null;
	if (req && req.cookies) {
		token = req.cookie["access_token"];
	}
	return token;
};

// authorization for specific end-points for specific role
passport.use(
	new JwtStrategy(
		{
			jwtFromRequest: cookieExtractor,
			secretOrKey: "mytutor",
		},
		(payload, done) => {
			User.findById({ _id: payload.sub }, (err, user) => {
				if (err) return done(err, false);
				if (user) return done(null, user);
				else return done(null, false);
			});
		}
	)
);

// authenticated Local Strategy using email and password
passport.use(
	new LocalStrategy((username, password, done) => {
		User.findOne({ username }, (err, user) => {
			if (err) return done(err);
			if (!user) return done(null, false);
			// to check password is correct
			user.comparePassword(password, done);
		});
	})
);
