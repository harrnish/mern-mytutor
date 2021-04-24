const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");
const passport = require("passport");
const passsportConfig = require("../../passport");
const JWT = require("jsonwebtoken");

// user model
const User = require("../../models/User");

/**
 * @route   GET api/users
 * @desc    Get all users
 * @access  Public
 */

const signToken = (userID) => {
	return JWT.sign(
		{
			iss: "mern-mytutor",
			sub: userID,
		},
		"mytutor",
		{ expiresIn: "1h" }
	);
};

router.get("/", (req, res) => {
	try {
		const users = User.find();
		if (!users) throw Error("No users exist");
		else User.find().then((users) => res.json(users));
	} catch (e) {
		res.status(400).json({ msg: e.message });
	}
});

router.post("/register", (req, res) => {
	const { username, password, role } = req.body;
	const email = username;

	User.findOne({ username }, (err, user) => {
		if (err) {
			res.status(500).json({ message: { msgBody: err, msgError: true } });
		}
		if (user) {
			res.status(400).json({
				message: { msgBody: "User is already registered", msgError: true },
			});
		} else {
			const newUser = new User({ username, email, password, role });
			newUser.save().then((user) =>
				res.json({
					message: { msgBody: username + " has been added" },
				})
			);
		}
	});
});

router.post(
	"/login",
	passport.authenticate("local", { session: false }),
	(req, res) => {
		if (req.isAuthenticated()) {
			const { _id, username, role } = req.user;

			const token = signToken(_id);
			res.cookie("access_token", token, { sameSite: true });

			res.status(200).json({ isAuthenticated: true, user: { username, role } });
		} else res.status(400).json({ message: "error" });
	}
);

router.get("/logout", (req, res) => {
	console.log("khjgdfhkdfg");
	res.clearCookie("access_token");
	res.json({ user: { username: "", role: "" }, success: true });
});

router.get(
	"/admin",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		if (req.user.role === "admin") {
			res
				.status(200)
				.json({ message: { msgBody: "You are an admin", msgError: false } });
		} else
			res.status(403).json({
				message: { msgBody: "You're not an admin,go away", msgError: true },
			});
	}
);

router.get(
	"/authenticated",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		const { username, role } = req.user;
		console.log(username, role);
		res.status(200).json({ isAuthenticated: true, user: { username, role } });
	}
);

module.exports = router;
