const express = require('express');
const app = express();
const es6Renderer = require('express-es6-template-engine');

// heroku doesn't need access to this file
if (process.env.NODE_ENV !== 'production'){
    require('./env.js');
}

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