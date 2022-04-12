const express = require('express');
const app = express();
const static = express.static(__dirname + '/public');
const session = require('express-session');

const configRoutes = require('./routes');
const exphbs = require('express-handlebars');


app.use('/public', static);
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}));
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

    if (req.session.user) {
        console.log(date + ":" + method + " " + route + " " + "(Authenticated User)");
        next();
    } else {
        console.log(date + ":" + method + " " + route + " " + "(Non-Authenticated User)");
        next();
    }
    });

app.use('/comment', (req,res,next) =>{
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
