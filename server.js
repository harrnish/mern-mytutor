const express = require("express");
const mongoose = require("mongoose");
const config = require("config");

const app = express();

app.use(express.json());

const db = config.get("mongoURI");

mongoose
	.connect(db, { useNewUrlParser: true, useCreateIndex: true })
	.then(() => console.log("MongoDB Connected.."))
	.catch((err) => console.log(err));

app.use("/api/users", require("./routes/api/users"));

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server started on port: ${port}`));
