import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Admin.scss";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const Admin = () => {
	const [profs, setProfs] = useState([]);
	const [open, setOpen] = React.useState(false);

	useEffect(() => {
		getProfs();
	}, []);
	const getProfs = () => {
		axios
			.get("http://localhost:4000/api/profs")
			.then((response) => {
				const data = response.data;
				setProfs(data);
				console.log(profs);
			})
			.catch((error) => {
				if (!error.response) {
					this.errorStatus = "Error: Network Error";
				} else {
					this.errorStatus = error.response.data.message;
				}
			});
	};

	const handleRequest = (isApproved, id) => {
		// alert(isApproved + " " + id);
		axios
			.post(`http://localhost:4000/api/profs/${id}`, { isApproved })
			.then((response) => {
				const data = response.data;
				getProfs();
			})
			.catch((error) => {
				// if (!error.response) {
				// 	this.errorStatus = "Error: Network Error";
				// } else {
				// 	this.errorStatus = error.response.data.message;
				// }
				console.log(error);
			});
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div className="admin">
			<div className="admin-container">
				<div className="admin-title">
					<h1>Professor Requests</h1>
					<div className="requests">
						<div className="requests-container">
							{profs.length
								? profs.map((prof) => (
										<div
											className="prof-request"
											key={`${prof.id}${prof.fname}`}
										>
											<div className="prof-name">
												<h1>
													{prof.fname} {prof.lname}
												</h1>
												<h3>{prof.institution}</h3>
												<div className="prof-request-controls">
													<button
														className="button approve-btn"
														onClick={() => {
															handleRequest(true, prof._id);
															setOpen(true);
														}}
													>
														Approve
													</button>
													<Dialog
														open={open}
														onClose={handleClose}
														aria-labelledby="alert-dialog-title"
														aria-describedby="alert-dialog-description"
													>
														<DialogTitle id="alert-dialog-title">
															Request approved! You can find professor on the
															search page!
														</DialogTitle>

														<DialogActions>
															<Button
																onClick={handleClose}
																color="primary"
																autoFocus
															>
																Close
															</Button>
														</DialogActions>
													</Dialog>
													<button
														className="button decline-btn"
														onClick={() => handleRequest(false, prof._id)}
													>
														Decline
													</button>
												</div>
											</div>
										</div>
								  ))
								: null}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Admin;
