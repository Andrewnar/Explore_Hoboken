const showRoute = require("./shows.js");

const constructorMethod = app => {
    app.use("/", showRoute);
    app.use("*", (req, res) => {
        res.render('display/error', {error: "404 ERROR: There are no webpages with that URL", title: "ERROR PAGE"});
        res.status(404);
      });
}

module.exports = constructorMethod;
