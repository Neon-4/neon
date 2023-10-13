import React from "react";
import { useState } from 'react';

const Login = ({ showLogin, setShowLogin }) => {
	// const [loggedInUser, setLoggedInUser] = useState(currentUser);
	// const [password, setPassword] = useState(currentPassword);

	const handleSubmit = e => {
		e.preventDefault();
		setShowLogin(current => !current);
	};

	// if (!showLogin) {
	// 	return null;
	// }

	return (
		<div className='w-1/3 max-w-xs mx-auto flex items-center justify-center h-screen'>
			<div className="login bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" 
            role="alertdialog"
			aria-modal={true}
			aria-labelledby="login_label"
            onClick={e => e.stopPropagation()}
            >
				<div className="loginHeader">
					<h1 id="login_label">Login</h1>
				</div>
				<form action="submit" className="loginForm bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
					<label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
						Username
					</label>
					<input
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
						type="text"
						name="username"
						id="username"
						placeholder="Username"
						// value={currentUser.username}
						// onChange={e => {
						// 	setPassword(e.target.value);
						// }}
						required
					/>
					<label htmlFor="password" className="block text-gray-700 text-sm font-bold mt-2 mb-1"
                        type="text"
						name="password"
						id="password"
						placeholder="Password"
						// value={currentUser.password}
						// onChange={e => {
						// 	setLoggedInUser(e.target.value);
						// }}
						required
                    >
						Password
					</label>
					<input
                        className='shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
						type="password"
						name="password"
						id="password"
						placeholder="Password"
						// value={currentPassword.password}
						// onChange={e => {
						// 	setPassword(e.target.value);
						// }}
						required
					/>
                    <p class="text-red-500 text-xs italic mb-3">Please choose a password.</p>
                    <div class="flex items-center justify-between">
                        <button class="modalButton bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-1 rounded focus:outline-none focus:shadow-outline" type="button">
                            Sign In
                        </button>
                        <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                            Forgot Password?
                        </a>
                    </div>
				</form>
			</div>
		</div>
	);
};

export default Login;