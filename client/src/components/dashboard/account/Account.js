import React, { useEffect, useState } from "react";
import "../search/Search.scss";
import "../request/Request.scss";
import { COLLEGELIST } from "../../constant";
import axios from "axios";

const Search = () => {
	const [college, setCollege] = useState("Conestoga");
	const [profList, setProfList] = useState([]);
	const [currentProf, setCurrentProf] = useState("");
	const [searchToggle, setSearchToggle] = useState(false);
	const [profReview, setProfReview] = useState("");
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

	function handleClick(event) {
		event.preventDefault();

		axios.post("http://localhost:4000/api/profs", { profReview });
	}

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
					<h1>Add Review</h1>
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
											Post a review for <br />
											<h1>
												{prof.fname} {prof.lname}
											</h1>
											<input
												type="text"
												name="review"
												value={profReview.review}
												autoComplete="off"
												onChange={handleReviewInput}
												placeholder="Write a review"
											/>
											<button
												onClick={handleClick}
												type="button"
												className="btn btn-submit btn-sq"
												// value="Send Request"
											>
												Send Requrest
											</button>
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
