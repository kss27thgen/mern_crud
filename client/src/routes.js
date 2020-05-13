import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from "./components/App";
import Create from "./components/Create";
import Nav from "./components/Nav";
import SignlePost from "./components/SignlePost";
import EditPost from "./components/EditPost";

const Routes = () => {
	return (
		<BrowserRouter>
			<Nav />
			<Switch>
				<Route exact path="/" component={App} />
				<Route exact path="/create" component={Create} />
				<Route exact path="/posts/:slug" component={SignlePost} />
				<Route exact path="/posts/:slug/edit" component={EditPost} />
			</Switch>
		</BrowserRouter>
	);
};

export default Routes;
