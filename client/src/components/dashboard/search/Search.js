import React, { useEffect, useState } from "react";
import "./Search.scss";
import { COLLEGELIST } from "../../constant";
import axios from "axios";

const Search = () => {
	const [college, setCollege] = useState("Conestoga");
	const [profList, setProfList] = useState([]);
	const handleChange = (event) => {
		//console.log(event.target);

		const { name, value } = event.target;

		setCollege((prevProf) => {
			return {
				...prevProf,
				[name]: value,
			};
		});
		// console.log(name, value);
	};

	useEffect(() => {
		axios
			.get("http://localhost:4000/api/profs/colleges")
			.then((response) => {
				const data = response.data;
				console.log(data);
				setProfList(data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	return (
		<div className="search">
			<div className="search-container">
				<div className="section-title">
					<h1>Find Professor</h1>
				</div>
				<br />
				<p>
					<select onChange={handleChange} value={college}>
						{COLLEGELIST.map((college) => (
							<option value={college.value}>{college.name}</option>
						))}{" "}
					</select>
				</p>
				<p>
					<select>
						{profList.filter((prof) => {
							if (prof.institution === college) {
								return <option value={prof.fname}>{prof.fname}</option>;
							}
							return null;
						})}
					</select>
				</p>
				<div className="search-btn-container">
					<input type="submit" className="search-btn" value="Add Review" />
				</div>
			</div>
		</div>
	);
};

export default Search;
