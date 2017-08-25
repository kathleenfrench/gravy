const express = require('express');
const app = express();
const es6Renderer = require('express-es6-template-engine');

// es6 template engine
app.engine('html', es6Renderer);
app.set('views', 'views');
app.set('view engine', 'html');

// config controllers to index
app.use(require('./controllers'));

// server port
const port = process.env.PORT || 3000;

app.listen(port);
console.log('express is running on: ' + port);