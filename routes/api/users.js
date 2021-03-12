const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

// user model
const User = require("../../models/User");

// @route   POST api/users
// @desc    register new user
// @access  public
router.post("/", (req, res) => {
	const { name, email, password } = req.body;

	if (!name || !email || !password) {
		return res.status(400).json({ msg: "Please enter all fields!" });
	}

	User.findOne({ email }).then((user) => {
		if (user) return es.status(400).json({ msg: "User already exists!" });

		const newUser = new User({
			name,
			email,
			password,
		});

		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(newUser.password, salt, (err, hash) => {
				if (err) throw err;
				newUser.password = hash;
				newUser.save().then((user) => {
					res.json({
						user: {
							id: user.id,
							name: user.name,
							email: user.email,
						},
					});
				});
			});
		});
	});
});

module.exports = router;
