import "./App.scss";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";

import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";
import Dashboard from "./components/dashboard/Dashboard";

function App() {
	return (
		<div className="App">
			<Navbar />
			{/* <Login /> */}
			{/* <Signup /> */}
			<Dashboard />
			<Footer />
		</div>
	);
}

export default App;
