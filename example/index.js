const express = require('express');
const expressHotwire = require('express-hotwire').default;
const app = express();

app.use(expressHotwire())

app.get('/', (_req, res) => {
    res.turboStream.append('message_1');
});

app.listen(3001, () => console.log('Example app listening on port 3001'));