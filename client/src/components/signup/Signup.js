import React, { useState, useRef, useEffect } from "react";
import "./Signup.scss";
import AuthService from "../../services/AuthService";
import Message from "../message/message";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import { Link } from "react-router-dom";

const Signup = (props) => {
	const [user, setUser] = useState({ username: "", password: "", role: "" });
	const [message, setMessage] = useState(null);
	const [open, setOpen] = React.useState(false);

	let timerID = useRef(null);

	useEffect(() => {
		return () => {
			clearTimeout(timerID);
		};
	}, []);

	const onChange = (e) => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};

	const resetForm = () => {
		setUser({ username: "", password: "", role: "" });
	};
	const onSubmit = (e) => {
		e.preventDefault();
		setOpen(true);
		AuthService.register(user).then((data) => {
			const { message } = data;
			setMessage(message);
			resetForm();
			if (!message.msgError) {
				timerID = setTimeout(() => {
					props.history.push("/login");
				}, 2000);
			}
		});
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div className="login">
			<div className="login-container">
				<div className="container-title">Register</div>
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
						<div className="container-input">
							<input
								type="text"
								name="role"
								placeholder="enter role"
								onChange={onChange}
								className="form-control"
							/>
						</div>
						<div className="container-input btn-sq">
							<input type="submit" className="btn-submit" />
						</div>
						<Dialog
							open={open}
							onClose={handleClose}
							aria-labelledby="alert-dialog-title"
							aria-describedby="alert-dialog-description"
						>
							<DialogTitle id="alert-dialog-title">
								Thank you for signing up!
							</DialogTitle>

							<DialogActions>
								<Button onClick={handleClose} color="primary" autoFocus>
									Close
								</Button>
							</DialogActions>
						</Dialog>
					</form>
					<div className="container-link">Don't have an account?</div>

					{message ? <Message message={message} /> : null}
				</div>
			</div>
		</div>
	);
};
export default Signup;
