import React from "react";
import "./Donate.scss";

const Donate = () => {
	return (
		<div className="donate">
			<div className="donate-container">
				<h1>Donate</h1>
				<div className="paypal-form">
					<form action="https://www.paypal.com/cgi-bin/webscr" method="post">
						<input type="hidden" name="business" value="paypal.me/harrnish" />
						<input type="hidden" name="cmd" value="_donations" />
						<input type="hidden" name="item_name" value="Friends of the Park" />
						<input
							type="hidden"
							name="item_number"
							value="Fall Cleanup Campaign"
						/>
						<input type="hidden" name="currency_code" value="USD" />
						<input
							type="image"
							name="submit"
							src="https://www.paypalobjects.com/webstatic/en_US/i/btn/png/btn_donate_92x26.png"
							alt="Donate"
						/>
						<img
							alt=""
							width="1"
							height="1"
							src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif"
						/>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Donate;
