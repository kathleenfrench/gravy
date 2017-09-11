const express = require('express');
const favicon = require('serve-favicon');
const path = require('path');
const app = express();
const es6Renderer = require('express-es6-template-engine');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const auth = require('./middleware/auth.js');
const csrf = require('./middleware/csrf.js');
const methodOverride = require('method-override');

// heroku doesn't need access to this file
if (process.env.NODE_ENV !== 'production'){
    require('./env.js');
}

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

// set app to properly parse both form encoded data and JSON by suggesting having app use different config 
// of the body parser middlewar in the server file 
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(csrf.checkCSRF);
app.use(auth.checkCookie);

// es6 template engine
app.engine('html', es6Renderer);
app.set('views', 'views');
app.set('view engine', 'html');
app.use(express.static('./assets'));

// config controllers to index
app.use(require('./controllers'));

// server port
const port = process.env.PORT || 3000;

app.listen(port);
console.log('express is running on: ' + port);