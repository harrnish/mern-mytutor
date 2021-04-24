import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import "./search-home.scss";

const PrivateRoute = ({ component: Component, roles, ...rest }) => {
	const { isAuthenticated, user } = useContext(AuthContext);
	return (
		<Route
			{...rest}
			render={(props) => {
				if (!isAuthenticated)
					return (
						<div className="search-home">
							<Redirect
								to={{ pathname: "/search", state: { from: props.location } }}
							/>
						</div>
					);

				if (!roles.includes(user.role))
					return (
						<Redirect to={{ pathname: "/", state: { from: props.location } }} />
					);
				return <Component {...props} />;
			}}
		/>
	);
};

export default PrivateRoute;
