import React from "react";
import Navbar from "../components/Navbar";
import App from "../App";
const Login = () => {
	return (
		<div className=".login-container">
			<h1>Witaj ponownie! </h1>
		
			<div className="login-form">
				<label htmlFor="email">Email ID</label>
				<br />
				<input
					type="email"
					id="email"
					name="email"
					placeholder="Enter your email"
				/>
				<br />
				<label htmlFor="password">Password</label>
				<br />
				<input
					type="password"
					id="password"
					name="password"
					placeholder="Enter your password"
				/>
				<br />
				<button type="submit">LOGIN</button>
			</div>
		</div>
	);
};

export default Login;
