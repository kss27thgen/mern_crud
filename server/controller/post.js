const Post = require("../model/Post");
const slugify = require("slugify");

// Create post
exports.create = (req, res) => {
	const { title, content, user } = req.body;
	const slug = slugify(title);

	// validate
	if (!title || !content) {
		return res.status(400).json({
			error: "Title and Content is required",
		});
	}

	Post.create({ title, content, user, slug }, (err, post) => {
		if (err) {
			console.log(err);
			res.status(400).json({ error: error.message });
		}
		res.json({ post });
	});
};

// Get Posts
exports.postList = (req, res) => {
	Post.find()
		.sort({ createdAt: -1 })
		.exec((err, posts) => {
			if (err) console.log(err);

			res.json(posts);
		});
};

// Get Post
exports.post = (req, res) => {
	const { slug } = req.params;
	Post.findOne({ slug }).exec((err, post) => {
		if (err) console.log(err);
		res.json(post);
	});
};

// Update post
exports.update = (req, res) => {
	const { slug } = req.params;
	const { title, content, user } = req.body;

	Post.findOneAndUpdate(
		{ slug },
		{ title, content, user },
		{ new: true },
	).exec((err, post) => {
		if (err) console.log(err);
		res.json(post);
	});
};

// Delete post
exports.remove = (req, res) => {
	const { slug } = req.params;

	Post.findOneAndRemove({ slug }).exec((err, post) => {
		if (err) console.log(err);
		res.json({ message: "Post deleted" });
	});
};
