import React, { useEffect, useState, useRef } from "react";
import "../search/Search.scss";
import "../account/Account.scss";
import { COLLEGELIST } from "../../constant";
import axios from "axios";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const Search = () => {
	const [college, setCollege] = useState("Conestoga");
	const [profList, setProfList] = useState([]);
	const [currentProf, setCurrentProf] = useState("");
	const [searchToggle, setSearchToggle] = useState(false);
	const [profReview, setProfReview] = useState("");
	const [open, setOpen] = React.useState(false);

	const handleChange = (event) => {
		//console.log(event.target);

		const { name, value } = event.target;

		setCollege(value);
		fetchColleges(value);
		setSearchToggle(false);
	};

	const handleReviewInput = (e) => {
		setProfReview(e.target.value);
	};

	const handleChangeProf = (event) => {
		//console.log(event.target);

		const { name, value } = event.target;
		setCurrentProf(value);
		setSearchToggle(false);
	};

	const handleClick = (id) => {
		// console.log( id,profReview);

		axios.post(`http://localhost:4000/api/profs/addreview/${id}`, {
			profReview,
		});

		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const fetchColleges = (college) => {
		axios
			.get(`http://localhost:4000/api/profs/colleges/${college}`)
			.then((response) => {
				const data = response.data;
				// console.log(data);
				setProfList(data);
				setCurrentProf(data[0].fname);
			})
			.catch((error) => {
				console.log(error);
			});
	};
	useEffect(() => {
		fetchColleges(college);
	}, []);

	return (
		<div className="search">
			<div className="search-container">
				<div className="section-title">
					<h1>Post Review</h1>
				</div>
				<br />
				<p>
					<select onChange={handleChange} value={college}>
						{COLLEGELIST.map((college) => (
							<option value={college.value}>{college.name}</option>
						))}
					</select>
				</p>
				<p>
					<select onChange={handleChangeProf} value={currentProf}>
						{Array.isArray(profList) && profList.length
							? profList.map((prof, index) => {
									if (prof.institution === college) {
										return (
											<option key={`${prof.fname}${index}`} value={prof.fname}>
												{prof.fname} {prof.lname}
											</option>
										);
									}
									return null;
							  })
							: null}
					</select>
				</p>
				<div className="search-btn-container">
					<input
						type="submit"
						className="search-btn"
						value="Select Professor"
						onClick={() => setSearchToggle(!searchToggle)}
					/>
				</div>
				<br />
				{searchToggle
					? Array.isArray(profList) && profList.length
						? profList.map((prof, index) => {
								if (prof.fname === currentProf) {
									return (
										<div>
											<br />
											<br />
											Post a review for <br />
											<h1 className="reviewProfName">
												{prof.fname} {prof.lname}
											</h1>
											<br />
											<input
												className="postReview"
												type="text"
												name="review"
												value={profReview.review}
												autoComplete="off"
												onChange={handleReviewInput}
												placeholder="Write a review"
											/>
											<button
												onClick={() => handleClick(prof._id)}
												type="button"
												className="btn btn-submit btn-sq"
												// value="Send Request"
											>
												Post
											</button>
											<Dialog
												open={open}
												onClose={handleClose}
												aria-labelledby="alert-dialog-title"
												aria-describedby="alert-dialog-description"
											>
												<DialogTitle id="alert-dialog-title">
													Thank you for posting a review! You can find out your
													review posted on the search tab!
												</DialogTitle>

												<DialogActions>
													<Button
														onClick={handleClose}
														color="primary"
														autoFocus
													>
														Close
													</Button>
												</DialogActions>
											</Dialog>
										</div>
									);
								}
								return null;
						  })
						: null
					: null}
			</div>
		</div>
	);
};

export default Search;
