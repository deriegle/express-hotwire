# Express library for working with Hotwire (HTML over the wire)

This project was built to provide tooling for working with the new `@hotwired/turbo` package built by Basecamp for their **NEW MAGIC** used with hey.com. I wanted to try building similar tooling in express as an example for how this can implemented in other languages, but also to help me learn how it works under the hood.

## Using the library

1. Add the `express-hotwire` package to your project

**Using npm**

```bash
npm install express-hotwire
```

**Using yarn**

```bash
yarn add express-hotwire
```

2. Use the middleware with your app

```js
const express = require('express');
const expressHotwire = require('express-hotwire');

const app = express();

app.use(expressHotwire());
```

3. Render your turbo stream responses using the res.turboStream object.

We provide helpful methods for all the actions listed in the [hotwire.dev docs](https://turbo.hotwire.dev/handbook/streams).

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

## Turbo Stream Messages and Actions

```js
// The contents of the partial will be appended to the element with DOM ID "messages".
res.turboStream.append('messages', {
  partial: 'messages/show',
  locals: {
    message: { id: 1, content: 'Hi' },
  },
});

// The contents of the partial will be prepended to the element with the DOM ID "messages".
res.turboStream.prepend('messages', {
  partial: 'messages/show',
  locals: {
    message: { id: 1, content: 'Hi' },
  },
});

// The contents of the partial will replace the existing element with the DOM ID "message_1".
res.turboStream.replace('message_1', {
  partial: 'messages/show',
  locals: {
    message: { id: 1, content: 'Hi' },
  },
});

// The contents of the partial will update the element with DOM ID "unread_count".
res.turboStream.update('unread_count', {
  partial: 'messages/show',
  locals: {
    message: { id: 1, content: 'Hi' },
  },
});

// The element with DOM ID "message_1" will be removed.
res.turboStream.remove('message_1');
```
