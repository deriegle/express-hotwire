const { Router } = require('express');
const MessageService = require('../services/message-service');
const RoomService = require('../services/room-service');

const router = Router();

router.param('roomId', (_req, _res, next, roomId) => {
  const room = RoomService.findById(roomId);

  if (!room) {
    next(new Error('Room not found.'));
    return;
  }

  next();
});

// Verify the :messageId parameter is for a valid Message.
router.param('messageId', (_req, _res, next, messageId) => {
  const message = MessageService.findById(messageId);

  if (!message) {
    next(new Error('Message not found.'));
    return;
  }

  next();
});

router.get('/rooms/:roomId/', async (req, res) => {
  const roomId = parseInt(req.params.roomId);

  const room = RoomService.findById(roomId);
  const messages = MessageService.all(roomId);

  res.render('rooms/view', {
    room,
    messages,
  });
});

// POST /rooms/:roomId/messages
// 
// Creates a new message and then appends the new message content to the #messages div
router.post('/rooms/:roomId/messages', async (req, res) => {
  const { content } = req.fields || {};
  const roomId = parseInt(req.params.roomId);

  const message = MessageService.create(content || '', roomId);

  await res.turboStream.append('messages', {
    partial: 'messages/show', // Use the messages/show.ejs template to append the #messages div
    locals: {
      message,
    }
  })
});

// GET /rooms/:roomId/messages/:messageId/edit
//
// Renders edit view for a particular message using turbo streams
router.get('/rooms/:roomId/messages/:messageId/edit', (req, res) => {
  const message = MessageService.findById(req.params.messageId); 

  res.render('messages/edit', {
    message,
  })
});

// POST /rooms/:roomId/messages/:messageId
//
// Updates existing message content
router.post('/rooms/:roomId/messages/:messageId', (req, res) => {
  const { content } = req.fields || {};
  const message = MessageService.updateById(req.params.messageId, content);

  res.render('messages/show', {
    message,
  });
});

// DELETE /rooms/:roomId/messages/:messageId
//
// Deletes a message and removes the element with the id of "message_{id}".
router.delete('/rooms/:roomId/messages/:messageId', async (req, res) => {
  const { messageId } = req.params;

  MessageService.removeById(messageId);

  await res.turboStream.remove(`message_${messageId}`);
});

module.exports = router;