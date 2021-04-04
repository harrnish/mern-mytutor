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

router.get("/colleges", async (req, res) => {
	try {
		const profs = await Prof.find();
		console.log(profs);
		let updatedProfs = profs
			.map((prof) => {
				if (prof.institution === "Conestoga") {
					return {
						fname: prof.fname,
						institution: prof.institution,
					};
				}

				if (prof.institution === "Humber") {
					return {
						fname: prof.fname,
						institution: prof.institution,
					};
				}

				if (prof.institution === "Lakehead") {
					return {
						fname: prof.fname,
						institution: prof.institution,
					};
				}
				return null;
			})
			.filter((e) => e);
		res.send(updatedProfs);
	} catch (e) {
		res.status(400).json({ msg: e.message });
	}
});

router.post("/", (req, res) => {
	const newProf = new Prof({
		fname: req.body.fname,
		lname: req.body.lname,
		institution: req.body.institution,
	});

	newProf.save().then((prof) => res.json(prof));
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
