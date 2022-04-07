const routes = require("./businesses.js");

const constructorMethod = app => {
    app.use("/", routes);
    app.use("*", (req, res) => {
        res.render('display/error', {error: "404 ERROR: There are no webpages with that URL", title: "ERROR PAGE"});
        res.status(404);
      });
}

module.exports = constructorMethod;
