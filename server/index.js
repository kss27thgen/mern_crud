const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();
const postRoutes = require("./route/post");

const app = express();

// connect to DB
mongoose
	.connect(process.env.DATABASE, {
		useUnifiedTopology: true,
		useNewUrlParser: true,
	})
	.then(() => console.log("Connected DB"));

// middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json({ extended: false }));

// route middleware
app.use("/api", postRoutes);

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
	console.log(`App listening on port ${PORT}!`);
});
