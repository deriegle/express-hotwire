const { Router } = require('express');
const MessageService = require('../services/message-service');

const router = Router();

// Verify the :messageId parameter is for a valid Message.
router.param('messageId', (_req, _res, next, messageId) => {
  const message = MessageService.findById(messageId);

  if (!message) {
    next(new Error('Message not found.'));
    return;
  }

  next();
});

// POST /messages
// 
// Creates a new message and then appends the new message content to the #messages div
router.post('/', async (req, res) => {
  const { content } = req.fields || {};

  const message = MessageService.create(content || '');

  await res.turboStream.append('messages', {
    partial: 'messages/show', // Use the messages/show.ejs template to append the #messages div
    locals: {
      message,
    }
  })
});

// GET /messages/:messageId/edit
//
// Renders edit view for a particular message using turbo streams
router.get('/:messageId/edit', (req, res) => {
  const message = MessageService.findById(req.params.messageId); 

  res.render('messages/edit', {
    message,
  })
});

// POST /messages/:messageId
//
// Updates existing message content
router.post('/:messageId', (req, res) => {
  const { content } = req.fields || {};
  const message = MessageService.updateById(req.params.messageId, content);

  res.render('messages/show', {
    message,
  });
});

// DELETE /messages/:messageId
//
// Deletes a message and removes the element with the id of "message_{id}".
router.delete('/:messageId', async (req, res) => {
  const { messageId } = req.params;

  MessageService.removeById(messageId);

  await res.turboStream.remove(`message_${messageId}`);
});

module.exports = router;