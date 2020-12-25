const express = require('express');
const expressHotwire = require('express-hotwire').default;
const app = express();

app.use(expressHotwire())

app.get('/', (req, res) => {
    res.send('<h1>It works!</h1>');
});

app.listen(3001, () => console.log('Example app listening on port 3001'));