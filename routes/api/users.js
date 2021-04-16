const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");

// user model
const User = require("../../models/User");

/**
 * @route   GET api/users
 * @desc    Get all users
 * @access  Public
 */
router.get("/", (req, res) => {
	try {
		const users = User.find();
		if (!users) throw Error("No users exist");
		else User.find().then((users) => res.json(users));
	} catch (e) {
		res.status(400).json({ msg: e.message });
	}
});

router.post("/", (req, res) => {
	const newUser = new User({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password,
	});

	newUser.save().then((user) => res.json(user));
});

module.exports = router;
