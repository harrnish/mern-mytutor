import React, { useEffect, useState } from "react";
import "./Loader.scss";

import CircularProgress from "@material-ui/core/CircularProgress";

const Loader = () => {
	function sleeper(ms) {
		return function (x) {
			return new Promise((resolve) => setTimeout(() => resolve(x), ms));
		};
	}
	const [post, setPost] = useState(null);
	useEffect(() => {
		fetch("https://jsonplaceholder.typicode.com/posts/1")
			.then(sleeper(4000))
			.then((response) => response.json())
			.then((response) => {
				const { body } = response;
				setPost(body);
			});
	}, []);
	return (
		<div className="loader">
			<div className="loader-container">
				{post ? post : <CircularProgress color="inherit" />}
			</div>
		</div>
	);
};

export default Loader;
