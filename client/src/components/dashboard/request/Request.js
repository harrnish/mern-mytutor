import React from "react";
import "./Request.scss";

const Request = () => {
	return (
		<div className="request">
			<div className="request-container">
				<div className="section-title">
					<h1>Request Listing</h1>
				</div>
				<br />
				<div className="request-form">
					<form action="">
						<input type="text" placeholder="Professor Name" />

						<input type="text" placeholder="College / University" />
						<div className="container-input btn-sq">
							<input
								type="submit"
								className="btn-submit"
								value="Send Request"
							/>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Request;
