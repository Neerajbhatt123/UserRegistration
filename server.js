const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyparser = require("body-parser");
const path = require("path");
const connectDB = require("./server/database/connection");
const app = express();

dotenv.config({ path: "config.env" });
const PORT = process.env.PORT || 8080;

//log request
app.use(morgan("tiny"));

//connect MongoDB
connectDB();

// parse request to body-praser
app.use(bodyparser.urlencoded({ extended: true }));

//set view engine
app.set("view engine", "ejs");
//if path is different or in any other floder
//app.set("views", path.resolve(__dirname, "views/anyfloder"));

//load assets
app.use("/css", express.static(path.resolve(__dirname, "assets/css")));
//css/style.css
app.use("/img", express.static(path.resolve(__dirname, "assets/img")));
//css/img
app.use("/js", express.static(path.resolve(__dirname, "assets/js")));
//css/.js

//Load routers
app.use("/", require("./server/routes/router"));

app.listen(PORT, () => {
  console.log("Working on server 3000");
});
