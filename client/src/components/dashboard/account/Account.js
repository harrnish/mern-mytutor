import React from "react";
import "./Account.scss";

const Account = () => {
	return (
		<div className="account">
			<div className="account-container">
				<div className="section-title">
					<h1>Account Info</h1>
				</div>

				<br />
				<div className="account-form">
					<form action="">
						<input type="text" placeholder="Harnish Mistry" />

						<input type="password" placeholder="Change Password" />
						<div className="container-input btn-sq">
							<input type="submit" className="btn-submit" value="Update" />
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Account;
