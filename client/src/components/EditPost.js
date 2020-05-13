import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "./Loader";

const EditPost = (props) => {
	const [loading, setLoading] = useState(true);
	const [state, setState] = useState({
		title: "",
		slug: "",
		content: "",
		user: "",
	});

	const { title, slug, content, user } = state;

	useEffect(() => {
		getPost(props.match.params.slug);
	}, [props.match.params.slug]);

	const getPost = async (slugArg) => {
		const res = await axios.get(`/posts/${slugArg}`);
		const { title, slug, content, user } = res.data;
		setState({ ...state, title, content, slug, user });
		setLoading(false);
	};

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
			.put(`/posts/${slug}`, { title, user, content })
			.then((res) => {
				const { title, content, slug, user } = res.data;
				setState({ ...state, title, content, slug, user });
				props.history.push("/");
			})
			.catch((err) => {
				console.log(err.response);
				alert(err);
			});
	};

	const renderEditForm = () => (
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
	);

	return loading ? (
		<Loader />
	) : (
		<div className="container pt-5 pb-2">
			<h2>Edit Post</h2>
			{renderEditForm()}
		</div>
	);
};

export default EditPost;
