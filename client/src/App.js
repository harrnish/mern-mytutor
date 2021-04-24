import "./App.scss";
import React, { useContext } from "react";
import { AuthContext } from "./Context/AuthContext";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";

import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";
import Dashboard from "./components/dashboard/Dashboard";
import Account from "./components/dashboard/account/Account";
import Request from "./components/dashboard/request/Request";
import Search from "./components/dashboard/search/Search";
import Reviews from "./components/dashboard/reviews/Reviews";
import Donate from "./components/donate/Donate";

import PrivateRoute from "./hocs/PrivateRoute";
import UnPrivateRoute from "./hocs/UnPrivateRoute";
import Admin from "./components/admin/Admin";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
const options = {
	Conestoga: [
		"Amber R. Kimmel",
		"William A. Rich",
		"Brian M. Craig",
		"Reginald M. Catania",
	],
	Humber: [
		"Megan T. Harris",
		"Ronald S. Sears",
		"Pamela S. Wamsley",
		"Jerry N. Pardue",
	],
	Lakehead: [
		"Tierra W. Blackwell",
		"Ann E. Pauley",
		"Ron C. Garner",
		"Simone J. McGregor",
	],
};
function App() {
	return (
		<Router>
			<div className="App">
				<Navbar />

				<Switch>
					<PrivateRoute
						path="/"
						roles={["user", "admin"]}
						exact
						component={Home}
					/>
					<UnPrivateRoute path="/signup" component={Signup} />
					<UnPrivateRoute path="/login" component={Login} />
					<UnPrivateRoute path="/donate" component={Donate} />

					<Route path="/search" component={Search} />
					<PrivateRoute path="/admin" roles={["admin"]} component={Admin} />
				</Switch>

				<Footer />
			</div>
		</Router>
	);
}

const Home = () => {
	return <Dashboard />;
};

export default App;
