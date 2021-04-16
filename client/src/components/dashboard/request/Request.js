import React, { useState } from "react";
import axios from "axios";
import "./Request.scss";
import { COLLEGELIST } from "../../constant";

import SpeechRecognition, {
	useSpeechRecognition,
} from "react-speech-recognition";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const Request = () => {
	const [input, setInput] = useState({
		profFName: "",
		profLName: "",
		profUni: "Conestoga",
	});
	const [open, setOpen] = React.useState(false);

	function handleChange(event) {
		//console.log(event.target);
		const { name, value } = event.target;

		setInput((prevInput) => {
			return {
				...prevInput,
				[name]: value,
			};
		});
		// console.log(name, value);
	}

	function handleClick(event) {
		event.preventDefault();

		const newProff = {
			fname: input.profFName,
			lname: input.profLName,
			institution: input.profUni,
		};
		// console.log(input);

		axios.post("http://localhost:4000/api/profs", newProff);
		setOpen(true);
	}

	const handleClose = () => {
		setOpen(false);
	};

	const { transcript, resetTranscript } = useSpeechRecognition();
	// const { transcript2, resetTranscript2 } = useSpeechRecognition();

	return (
		<div className="request">
			<div className="request-container">
				<div className="section-title">
					<h1>Request Listing</h1>
				</div>
				<br />
				<div className="request-form">
					<div className="voice-input-buttons">
						<button className="btn" onClick={SpeechRecognition.startListening}>
							Say First Name{" "}
						</button>
						<button className="btn" onClick={resetTranscript}>
							{" "}
							Reset{" "}
						</button>

						{/*	<button className="btn" onClick={SpeechRecognition.startListening}>
							Say Last Name{" "}
						</button>
						<button className="btn" s onClick={resetTranscript2}>
							{" "}
							Reset{" "}
    </button> */}
					</div>
					<br />
					<form action="" className="form-group">
						<input
							type="text"
							name="profFName"
							value={(input.profName, transcript)}
							autoComplete="off"
							onChange={handleChange}
							placeholder="Professor first Name"
						/>

						<input
							type="text"
							name="profLName"
							value={input.profName}
							autoComplete="off"
							onChange={handleChange}
							placeholder="Professor last Name"
						/>

						<select
							onChange={handleChange}
							name="profUni"
							value={input.profUni}
							placeholder="College / University"
						>
							{COLLEGELIST.map((college) => (
								<option value={college.value}>{college.name}</option>
							))}
						</select>

						<button
							onClick={handleClick}
							type="button"
							className="btn btn-submit btn-sq"
							// value="Send Request"
						>
							Send Request
						</button>
						<Dialog
							open={open}
							onClose={handleClose}
							aria-labelledby="alert-dialog-title"
							aria-describedby="alert-dialog-description"
						>
							<DialogTitle id="alert-dialog-title">
								You can start posting reviews of the requested professor once
								the admin approves your request! Thank you.
							</DialogTitle>

							<DialogActions>
								<Button onClick={handleClose} color="primary" autoFocus>
									Close
								</Button>
							</DialogActions>
						</Dialog>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Request;
