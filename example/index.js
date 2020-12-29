const express = require('express');
const hotwire = require('express-hotwire').default;
const formidable = require('express-formidable');
const methodOverride = require('method-override');
const path = require('path');

const PORT = process.env.PORT || 3001;

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public'))); // Load files from public directly
app.use(hotwire()); // Hotwire middleware for turbo streams
app.use(formidable()); // Collect data from form submissions
app.use(methodOverride('_method')); // Allow DELETE requests

app.get('/', (_req, res) => {
    res.turboStream.append('message_1');
});

app.listen(PORT, () => console.log('Example app listening on port 3001'));