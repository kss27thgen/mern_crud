import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "./Loader";

const SignlePost = (props) => {
	const [post, setPost] = useState({});
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		getPost(props.match.params.slug);
	}, [props.match.params.slug]);

	const getPost = async (slug) => {
		const res = await axios.get(`/posts/${slug}`);
		setPost(res.data);
		setLoading(false);
	};

	return loading ? (
		<Loader />
	) : (
		<div className="container pt-5 pb-2">
			<div className="col">
				<h2>{post.title}</h2>
				<p className="lead mt-4">{post.content}</p>
				<p>
					Author <span className="badge">{post.user}</span> Published
					on&ensp;
					<span className="badge">
						{new Date(post.createdAt).toLocaleString()}
					</span>
				</p>
			</div>
		</div>
	);
};

export default SignlePost;
