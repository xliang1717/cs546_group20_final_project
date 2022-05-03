const express = require('express');
const app = express();
const session = require('express-session');
const configRoutes = require('./routes');
const exphbs = require("express-handlebars");
const static = express.static(__dirname + '/public');


app.use('/public', static);
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use(
  session({
  name: 'AuthCookie',
  secret: 'some secret string!',
  resave: false,
  saveUninitialized: true
}))

app.use("/user", (req, res, next) => {
  req.session.user = {username : 'Weini', userId : '1212123213'}; //test
  if (!req.session.user) {
    res.status(403).render("pages/error", { error: "User is not logged in" });
  } else {
    next();
  }
});

app.use("/parklot", (req, res, next) => {
  req.session.user = {username : 'Weini', userId : '1212123213'}; //test
  if (!req.session.user) {
    res.status(403).render("pages/error", { error: "User is not logged in" });
  } else {
    next();
  }
});
app.use("/myCar", (req, res, next) => {
  req.session.user = {username : 'Weini', userId : '1212123213'}; //test
  if (!req.session.user) {
    res.status(403).render("pages/error", { error: "User is not logged in" });
  } else {
    next();
  }
});
app.use("/myCollection", (req, res, next) => {
  req.session.user = {username : 'Weini', userId : '1212123213'}; //test
  if (!req.session.user) {
    res.status(403).render("pages/error", { error: "User is not logged in" });
  } else {
    next();
  }
});


app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});
