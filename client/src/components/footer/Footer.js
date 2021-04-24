import React from "react";
import "./Footer.scss";
import { Link } from "react-router-dom";

const Footer = () => {
	return (
		<div className="footer">
			<div className="footer-container">
				<span>
					&copy; 2021, MyTutor. All rights reserved.{" "}
					<a href="https://www.paypal.com/paypalme/harrnish" target="_blank">
						Donate now!
					</a>
				</span>
			</div>
		</div>
	);
};

export default Footer;
