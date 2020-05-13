import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
	return (
		<nav className="container">
			<ul className="nav nav-tabs">
				<li className="nav-item pr-3 py-3">
					<Link to="/">Home</Link>
				</li>
				<li className="nav-item ml-auto py-3">
					<Link to="/create">New Post</Link>
				</li>
			</ul>
		</nav>
	);
};

export default Nav;
