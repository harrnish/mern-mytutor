import React from "react";
import { Link } from "react-router-dom";

import "./Navbar.scss";

const Navbar = () => {
	return (
		<div className="navbar">
			<div className="navbar-container">
				<div className="navbar-logo">
					<Link
						className="navbar-logo-container"
						to="/"
						style={{ textDecoration: "none", color: "#fff" }}
					>
						<span>my</span>tutor
					</Link>
				</div>

				<div className="navbar-links">
					<Link className="navbar-link navbar-login btn btn-filled" to="/login">
						<div className="navbar-login-container">Login</div>
					</Link>
					<Link className="navbar-link navbar-signup btn" to="signup">
						<div className="navbar-signup-container">Signup</div>
					</Link>
					<Link
						className="navbar-link navbar-signup btn admin-link"
						to="/admin"
					>
						<div className="navbar-signup-container">Admin</div>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
