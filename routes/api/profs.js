const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");

// Prof model
const Prof = require("../../models/Prof");

/**
 * @route   GET api/profs
 * @desc    Get all profs
 * @access  Public
 */

router.get("/", (req, res) => {
	try {
		const profs = Prof.find();
		if (!profs) throw Error("No professor found");
		else Prof.find().then((profs) => res.json(profs));
	} catch (e) {
		res.status(400).json({ msg: e.message });
	}
});

router.get("/colleges/:college", async (req, res) => {
	try {
		let { college } = req.params;
		const profs = await Prof.find({ institution: college });
		res.send(profs);
	} catch (e) {
		res.status(400).json({ msg: e.message });
	}
});

router.post("/", (req, res) => {
	const newProf = new Prof({
		fname: req.body.fname,
		lname: req.body.lname,
		institution: req.body.institution,
		reviews: req.body.reviews,
	});
	console.log(newProf);
	// console.log(req.body.reviews);

	newProf.save().then((prof) => res.json(prof));
});

router.post("/addreview/:id", async (req, res) => {
	try {
		let id = req.params.id;
		let profReview = req.body.profReview;

		const filter = { _id: id };
		// const update = { isApproved: isApproved };

		// console.log("here", id, profReview);
		let newProf = await Prof.findOneAndUpdate(filter, {
			$push: { reviews: [profReview] },
		});
		res.send(newProf);
	} catch (err) {
		console.log(err);
	}
});

router.post("/:id", async (req, res) => {
	try {
		let id = req.params.id;
		let isApproved = req.body.isApproved;

		const filter = { _id: id };
		const update = { isApproved: isApproved };

		console.log(id, isApproved);
		if (isApproved) {
			let newProf = await Prof.findOneAndUpdate(filter, update);
			res.send(newProf);
		} else {
			let newProf = await Prof.findOneAndDelete(filter);
			res.send(newProf);
		}
	} catch (err) {
		console.log(err);
	}
});

module.exports = router;
