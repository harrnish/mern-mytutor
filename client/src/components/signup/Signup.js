import React from "react";
import "./Signup.scss";

const Signup = () => {
	return (
		<div className="signup">
			<div className="signup-container">
				<div className="container-title">Sign up</div>
				<div className="container-form">
					<form action="">
						<div className="container-input">
							<input type="text" placeholder="E-mail" />
						</div>
						<div className="container-input">
							<input type="password" placeholder="Password" />
						</div>
						<div className="container-input">
							<input type="password" placeholder="Re-type password" />
						</div>
						<div className="container-input btn-sq">
							<input type="submit" className="btn-submit" />
						</div>
					</form>
					<div className="container-link">Already have an account?</div>
				</div>
			</div>
		</div>
	);
};

export default Signup;
