const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

// create schema
const UserSchema = new Schema({
	username: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		// required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	role: {
		type: String,
		enum: ["user", "admin"],
		required: true,
	},
	registered_date: {
		type: Date,
		default: Date.now,
	},
});

// hash password before saving into database

UserSchema.pre("save", function (next) {
	if (!this.isModified("password")) {
		return next();
	} else {
		bcrypt.hash(this.password, 10, (err, passwordHash) => {
			if (err) return next(err);
			this.password = passwordHash;
			next();
		});
	}
});

UserSchema.methods.comparePassword = function (password, cb) {
	bcrypt.compare(password, this.password, (err, isMatch) => {
		if (err) return cb(err);
		else {
			if (!isMatch) return cb(null, isMatch);
			return cb(null, this);
		}
	});
};

module.exports = User = mongoose.model("user", UserSchema);
