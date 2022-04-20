const express = require('express');
// const bodyParser = require('body-parser')
const app = express();
const static = express.static(__dirname + '/public');
const session = require('express-session');

const configRoutes = require('./routes');
const exphbs = require('express-handlebars');

const handlebarsInstance = exphbs.create({
    defaultLayout: 'main',
    // Specify helpers which are only registered on this instance.
    helpers: {
        asJSON: (obj, spacing) => {
          if (typeof spacing === 'number')
            return new Handlebars.SafeString(JSON.stringify(obj, null, spacing));
    
          return new Handlebars.SafeString(JSON.stringify(obj));
        }
      },

    partialsDir: ['views/partials/']
  });

  const rewriteUnsupportedBrowserMethods = (req, res, next) => {
    // If the user posts to the server with a property called _method, rewrite the request's method
    // To be that method; so if they post _method=PUT you can now allow browsers to POST to a route that gets
    // rewritten in this middleware to a PUT route
    if (req.body && req.body._method) {
      req.method = req.body._method;
      delete req.body._method;
    }
  
    // let the next middleware run:
    next();
  };

app.use(rewriteUnsupportedBrowserMethods);
app.use('/public', static);
app.use(express.json());
app.use(express.urlencoded({extended: true}));
// app.use(bodyParser.urlencoded({ extended: false }));

app.engine('handlebars', handlebarsInstance.engine);
app.set('view engine', 'handlebars');

app.use(session({
    name: 'AuthCookie',
    secret: 'some secret string!',
    resave: false,
    saveUninitialized: true,
    }));

app.use((req, res, next) => {
    
    let date = new Date().toUTCString();
    let method = req.method;
    let route = req.originalUrl;

    req.session.user = {username : 'Weini', userId : '1212123213'}; //test



    if (req.session.user) {
        console.log(date + ":" + method + " " + route + " " + "(Authenticated User)");
        next();
    } else {
        console.log(date + ":" + method + " " + route + " " + "(Non-Authenticated User)");
        next();
    }
    });

app.use('/comment', (req,res,next) =>{
    req.session.user = {username : 'Weini', userId : '1212123213'}; //test
    
    if (!req.session.user){ 
        res.status(403).render('result/comment', {title: 'Error', content: 'you are not logged in', haserror : true});
    }else{
        next();
    }
    });

configRoutes(app);

app.listen(3000, () => {
console.log("We've now got a server!");
console.log('Your routes will be running on http://localhost:3000');
});
