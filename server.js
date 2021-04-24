const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(express.json());

const db = require("./config/keys").mongoURI;

//connect to mongodb
mongoose
	.connect(db, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("MongoDB Connected.."))
	.catch((err) => console.log(err));

app.use("/users", require("./routes/api/users"));
app.use("/profs", require("./routes/api/profs"));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port: ${port}`));
