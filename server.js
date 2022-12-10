const express = require("express");
const db = require("./routes/database");
const app = express();
const cookie = require("cookie-parser");
app.use("/js", express.static(__dirname + "./public/js"))
app.use("/js", express.static(__dirname + "./public/css"))
app.set("view engine", "ejs");
app.set("views", "./views");
app.engine('html', require('ejs').renderFile);
app.use(cookie());
app.use(express.json());
app.use(express.urlencoded({extended: true}))
db.connect((err) =>{
    if(err) throw err;
    console.log("Datbase connected");
})
app.use("/", require("./routes/pages"));
app.use("/api", require("./routes/auth"))

app.listen(3000);
