const express = require("express");
const path = require("path");
const routesYT = require("./routes/youtube");
const routesTTV = require("./routes/twitch");

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "client/build")));
app.set("views", path.join(__dirname, "..", "client/build"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

app.get("/", (req, res) => {
    return res.render("index.html");
});

app.get("/yt", (req, res) => {
    return res.render("index.html");
});

app.use(routesTTV);
app.use(routesYT);

app.use((req, res) => {
    res.status(404);
    return res.render("index.html");
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));