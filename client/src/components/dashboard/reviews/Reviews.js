import React from "react";
import "./Reviews.scss";

import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import DeleteIcon from "@material-ui/icons/Delete";

const Reviews = () => {
	return (
		<div className="reviews">
			<div className="reviews-container">
				<div className="section-title">
					<h1>Your Reviews</h1>
				</div>
				<br />
				<div className="reviews-list">
					<div className="review-card">
						<div className="review-account">USER30HJS</div>
						<div className="review-text">
							Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sapiente
							voluptatum architecto rerum alias aspernatur mollitia impedit
							deserunt, quod optio ut nemo facilis similique maiores eligendi
							adipisci, sed dolore corporis consequuntur.
						</div>
						<div className="review-reactions">
							<div className="review-like-btn review-act-btn">
								<ThumbUpAltOutlinedIcon /> &nbsp;{" "}
								<spam className="review-likes-count">27 likes</spam>
							</div>
							<div className="review-delete-btn review-act-btn">
								<DeleteIcon />
							</div>
						</div>
					</div>
					<div className="review-card">
						<div className="review-account">USER45KIO</div>
						<div className="review-text">
							Lorem ipsum dolor sit amet, consectetur adipisicing elit.
							Consequuntur optio cumque, molestias laboriosam possimus accusamus
							corporis amet fugit rem eum hic ratione at dolores.
						</div>
						<div className="review-reactions">
							<div className="review-like-btn review-act-btn">
								<ThumbUpAltOutlinedIcon /> &nbsp;{" "}
								<spam className="review-likes-count">42 likes</spam>
							</div>
							<div className="review-delete-btn review-act-btn">
								<DeleteIcon />
							</div>
						</div>
					</div>
					<div className="review-card">
						<div className="review-account">USER12KLJ</div>
						<div className="review-text">
							Lorem, ipsum dolor sit amet consectetur adipisicing elit.
							Molestiae blanditiis reprehenderit nobis placeat minus rem,
							dolorem minima alias aspernatur quidem. Est, id repellat. Placeat,
							amet voluptatum officiis ipsam adipisci asperiores suscipit
							commodi sunt similique!
						</div>
						<div className="review-reactions">
							<div className="review-like-btn review-act-btn">
								<ThumbUpAltOutlinedIcon /> &nbsp;{" "}
								<spam className="review-likes-count">32 likes</spam>
							</div>
							<div className="review-delete-btn review-act-btn">
								<DeleteIcon />
							</div>
						</div>
					</div>
				</div>
			</div>
			<br />
			<br />
			<br />
		</div>
	);
};

export default Reviews;
