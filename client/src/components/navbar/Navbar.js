import React from "react";
import "./Navbar.scss";

const Navbar = () => {
	return (
		<div className="navbar">
			<div className="navbar-container">
				<div className="navbar-logo">
					<div className="navbar-logo-container">
						<span>my</span>tutor
					</div>
				</div>
				<div className="navbar-links">
					<div className="navbar-link navbar-login btn btn-filled">
						<div className="navbar-login-container">Login</div>
					</div>
					<div className="navbar-link navbar-signup btn">
						<div className="navbar-signup-container">Signup</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
