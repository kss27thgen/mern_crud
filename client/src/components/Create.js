import React, { useState } from "react";
import axios from "axios";

const Create = (props) => {
	const [state, setState] = useState({
		title: "",
		user: "",
		content: "",
	});
	const { title, user, content } = state;

	const handleChange = (e) => {
		setState({
			...state,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// const config = {
		// 	headers: {
		// 		"Content-Type": "application/json",
		// 	},
		// };
		axios
			.post(`/post`, { title, user, content })
			.then((res) => {
				console.log(res.data);
				setState({
					title: "",
					user: "",
					content: "",
				});
				props.history.push("/");
			})
			.catch((err) => {
				console.log(err.response);
				alert(err);
			});
	};

	return (
		<div className="container mt-5">
			<h2>Create Post</h2>
			<form className="mt-3" onSubmit={handleSubmit}>
				<div className="form-group">
					<label className="text-muted">Title</label>
					<input
						className="form-control"
						type="text"
						name="title"
						value={title}
						onChange={handleChange}
					/>
				</div>
				<div className="form-group">
					<label className="text-muted">Your name</label>
					<input
						type="text"
						className="form-control"
						value={user}
						name="user"
						onChange={handleChange}
					/>
				</div>
				<div className="form-group">
					<label className="text-muted">Content</label>
					<textarea
						className="form-control"
						value={content}
						name="content"
						onChange={handleChange}
					/>
				</div>
				<div>
					<button className="btn btn-primary">Create</button>
				</div>
			</form>
		</div>
	);
};

export default Create;
