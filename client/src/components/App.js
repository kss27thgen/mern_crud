import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Loader from "./Loader";
import { Link } from "react-router-dom";

function App() {
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetchPosts();
	}, [setPosts]);

	const fetchPosts = async () => {
		const res = await axios.get("/posts");
		setPosts(res.data);
		setLoading(false);
	};

	const handleDelete = (slug) => {
		let answer = window.confirm("Are you sure?");
		if (answer) {
			deletePost(slug);
		}
	};

	const deletePost = (slug) => {
		axios.delete(`/posts/${slug}`).then(() => {
			fetchPosts();
		});
	};

	return (
		<div className="container p-5">
			<h2>MERN CRUD</h2>
			{loading || !posts ? (
				<Loader />
			) : (
				posts.map((post, i) => (
					<div className="row mt-5 border border-black" key={i}>
						<div className="col-md-9 pt-3 pb-2">
							<Link to={`/posts/${post.slug}`}>
								<h2>{post.title}</h2>
							</Link>
							<p className="lead">
								{post.content.length > 50
									? post.content.substring(0, 50) + "..."
									: post.content}
							</p>
							<p>
								Author{" "}
								<span className="badge">{post.user}</span>{" "}
								Published on&ensp;
								<span className="badge">
									{new Date(post.createdAt).toLocaleString()}
								</span>
							</p>
						</div>
						<div className="col-md-3 mt-4 d-flex align-items-start">
							<Link to={`/posts/${post.slug}/edit`}>
								<p className="btn btn-sm btn-warning mr-1">
									Update
								</p>
							</Link>
							<button
								className="btn btn-sm btn-danger"
								onClick={() => handleDelete(post.slug)}
								type="button"
							>
								Delete
							</button>
						</div>
					</div>
				))
			)}
		</div>
	);
}

export default App;
