const express = require("express");
const mongoose = require("mongoose");

const app = express();

// bodyparser middleware
// BodyParse is built into Express js So now you don't have to install body-parser, do this instead
//app.use(bodyParser.json());
app.use(express.json());

// DB config
const db = require("./config/keys").mongoURI;

//connect to mongodb
mongoose
	.connect(db, { useNewUrlParser: true, useCreateIndex: true })
	.then(() => console.log("MongoDB Connected.."))
	.catch((err) => console.log(err));

// use routes
app.use("/api/users", require("./routes/api/users"));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started on port: ${port}`));
