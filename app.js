const express = require("express");
const app = express();
const static = express.static(__dirname + "/public");

const configRoutes = require("./routes");
const exphbs = require("express-handlebars");

app.use("/public", static);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const Handlebars = require("handlebars");
Handlebars.registerHelper("page", function (arr, pageSize, options) {
  var result = [];
  for (var i = 0; i < arr.length; i += pageSize) {
    result.push(options.fn({ items: arr.slice(i, i + pageSize) }));
  }
  return result.join("");
});
app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});
