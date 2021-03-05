import React, { Component } from "react";
import "./Dashboard.scss";

import Account from "./account/Account";
import Reviews from "./reviews/Reviews";
import Request from "./request/Request";
import Search from "./search/Search";

import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import PersonPinIcon from "@material-ui/icons/PersonPin";
import SearchIcon from "@material-ui/icons/Search";
import ChatIcon from "@material-ui/icons/Chat";
import PersonAddIcon from "@material-ui/icons/PersonAdd";

import Box from "@material-ui/core/Box";

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

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`scrollable-prevent-tabpanel-${index}`}
			aria-labelledby={`scrollable-prevent-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box p={3}>
					<div>{children}</div>
				</Box>
			)}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired,
};

function a11yProps(index) {
	return {
		id: `scrollable-prevent-tab-${index}`,
		"aria-controls": `scrollable-prevent-tabpanel-${index}`,
	};
}

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		width: "100%",
		backgroundColor: theme.palette.background.paper,
	},
}));

const Dashboard = () => {
	const classes = useStyles();
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<div className={classes.root}>
			<div className="dashboard">
				<div className="dashboard-container">
					<AppBar position="fixed" className="appbar-custom">
						<Tabs
							TabIndicatorProps={{
								style: { background: "#fff", height: "2px" },
							}}
							value={value}
							onChange={handleChange}
							variant="scrollable"
							scrollButtons="off"
							aria-label="scrollable prevent tabs example"
						>
							<Tab
								icon={<PersonPinIcon />}
								style={{ fill: "black" }}
								aria-label="person"
								{...a11yProps(0)}
							/>
							<Tab icon={<SearchIcon />} aria-label="help" {...a11yProps(1)} />
							<Tab
								icon={<ChatIcon />}
								aria-label="shopping"
								{...a11yProps(2)}
							/>
							<Tab icon={<PersonAddIcon />} aria-label="up" {...a11yProps(3)} />
						</Tabs>
					</AppBar>

					<div className="tab-container">
						<TabPanel value={value} index={0}>
							<Account />
						</TabPanel>
						<TabPanel value={value} index={1}>
							<Search options={options} />
						</TabPanel>
						<TabPanel value={value} index={2}>
							<Reviews />
						</TabPanel>
						<TabPanel value={value} index={3}>
							<Request />
						</TabPanel>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
