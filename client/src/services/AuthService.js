export default {
	login: (user) => {
		console.log(user);
		const res = fetch("/users/login", {
			method: "POST",
			body: JSON.stringify(user),
			headers: {
				"Content-Type": "application/json",
			},
		});
		return res.then((res) => res.json());
	},
	register: (user) => {
		console.log(user);
		return fetch("/users/register", {
			method: "post",
			body: JSON.stringify(user),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then((data) => data);
	},
	logout: () => {
		return fetch("/users/logout")
			.then((res) => res.json())
			.then((data) => data);
	},
	isAuthenticated: () => {
		return fetch("/users/authenticated").then((res) => {
			if (res.status !== 401) return res.json().then((data) => data);
			else return { isAuthenticated: false, user: { username: "", role: "" } };
		});
	},
};
