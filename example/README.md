# Express-hotwire Example project

This project is using the new `@hotwired/turbo` package built by Basecamp for their **NEW MAGIC** used with hey.com. I wanted to try to figure out how it works behind the scenes after trying it out in Rails. There is a lot of magic going on behind the scenes like most Rails features. I figured building it in Node.js/Express would help me understand it more.

I've built this application to be similar to the sample application that is built in the video on [hotwire.dev](https://hotwire.dev). Make sure to check out that video if you haven't.

The primary goal was to learn and to provide a clear example to others on how the magic works and how it can be used in different programming languages.

## Facts about this project:

- We are using an in-memory model of a Message that we interact with on the page.
- We are using the `express-hotwire` middleware library that makes turbo-stream responses super easy in Node.

## Using the express-hotwire middleware

1.  Import and use the middleware

```js
const express = require('express');
const expressHotwire = require('express-hotwire');

const app = express();

app.use(expressHotwire());
```

2.  Render your turbo stream response

**Append**

```js
app.post('/messages', (req, res) => {
  const { content } = req.fields;

  // create message and save in database/memory/etc
  const message = create(content);

  // Make sure the first argument matches the HTML element id that you want to append a child to
  res.turboStream.append('messages', {
    partial: 'messages/show', // This should be inside your views directory as views/messages/show.ejs
    locals: {
      // Add any variables needed to render the partial
      message,
    },
  });
});
```
