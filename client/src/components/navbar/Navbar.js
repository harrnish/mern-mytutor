import React, { useContext } from "react";
import "./Navbar.scss";
import { Link, useHistory } from "react-router-dom";
import AuthService from "../../services/AuthService";
import { AuthContext } from "../../Context/AuthContext";

const Navbar = (props) => {
	const abc = useContext(AuthContext);
	const history = useHistory();

	const { user, setUser, isAuthenticated, setIsAuthenticated } = abc;
	const onClickLogOuthandler = () => {
		AuthService.logout().then((data) => {
			setIsAuthenticated(false);
			history.push("/login");
		});
	};
	const unauthenticatedNavBar = () => {
		return (
			<div>
				<div className="navbar-link navbar-login btn btn-filled">
					<div className="navbar-login-container">
						<Link to="/login" style={{ textDecoration: "none", color: "#000" }}>
							Login
						</Link>
					</div>
				</div>
				<div className="navbar-link navbar-signup btn btn-filled">
					<div className="navbar-signup-container">
						<Link
							to="/signup"
							style={{ textDecoration: "none", color: "#000" }}
						>
							Signup
						</Link>
					</div>
				</div>
			</div>
		);
	};

	const authenticatedNavBar = () => (
		<div>
			{user.role === "admin" ? (
				<div className="navbar-link navbar-signup btn btn-filled">
					<div className="navbar-signup-container">
						<Link to="/admin" style={{ textDecoration: "none" }}>
							Admin panel
						</Link>
					</div>
				</div>
			) : null}

			<div className="navbar-link navbar-signup btn btn-filled">
				<div className="navbar-signup-container">
					<Link
						type="button"
						onClick={onClickLogOuthandler}
						style={{ textDecoration: "none", color: "#000" }}
					>
						Logout
					</Link>
				</div>
			</div>
		</div>
	);

	const navStyle = {
		color: "white",
		textDecoration: "none",
	};
	return (
		<div className="navbar">
			<div className="navbar-container row w-100">
				<div className="navbar-logo col">
					<div className="navbar-logo-container">
						<Link to="/" style={navStyle}>
							<span>my</span>tutor
						</Link>
					</div>
				</div>
				<div className="navbar-links">
					{!isAuthenticated ? unauthenticatedNavBar() : authenticatedNavBar()}
				</div>
			</div>
		</div>
	);
};

export default Navbar;
