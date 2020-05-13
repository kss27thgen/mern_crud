const express = require("express");
const router = express.Router();

const {
	create,
	postList,
	post,
	update,
	remove,
} = require("../controller/post");

router.post("/post", create);
router.get("/posts", postList);
router.get("/posts/:slug", post);
router.put("/posts/:slug", update);
router.delete("/posts/:slug", remove);

module.exports = router;
