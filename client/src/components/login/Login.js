import React, { useState, useContext } from "react";
import "./Login.scss";
import { Link } from "react-router-dom";

import AuthService from "../../services/AuthService";
import { AuthContext } from "../../Context/AuthContext";
import Message from "../message/message";

const Login = (props) => {
	const [user, setUser] = useState({ username: "", password: "" });
	const [message, setMessage] = useState(null);
	const authContext = useContext(AuthContext);

	const onChange = (e) => {
		e.preventDefault();
		setUser({ ...user, [e.target.name]: e.target.value });
		console.log(user);
	};
	const onSubmit = (e) => {
		e.preventDefault();
		AuthService.login(user).then((data) => {
			const { isAuthenticated, user, message } = data;
			if (isAuthenticated) {
				authContext.setUser(user);
				authContext.setIsAuthenticated(isAuthenticated);
				console.log(user);
				props.history.push("/");
			} else {
				setMessage(message);
			}
		});
	};

	return (
		<div className="login">
			<div className="login-container">
				<div className="container-title">Login</div>
				<div className="container-form">
					<form action="" onSubmit={onSubmit}>
						<div className="container-input">
							<input
								type="text"
								name="username"
								placeholder="enter username"
								onChange={onChange}
								className="form-control"
							/>
						</div>
						<div className="container-input">
							<input
								type="password"
								name="password"
								placeholder="enter password"
								onChange={onChange}
								className="form-control"
							/>
						</div>
						<div className="container-input btn-sq">
							<input type="submit" className="btn-submit" />
						</div>
					</form>

					{message ? <Message message={message} /> : null}
				</div>
			</div>
		</div>
	);
};

export default Login;
