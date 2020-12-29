const { Router } = require('express');
const Message = require('../models/message');

const router = Router();

// Verify the :messageId parameter is for a valid Message.
router.param('messageId', (_req, _res, next, messageId) => {
    const message = Message.findById(messageId);

    if (message) {
        next();
    } else {
        next(new Error('Message not found.'));
    }
});

// POST /messages
// 
// Creates a new message and then appends the new message content to the #messages div
router.post('/', (req, res) => {
    const { content } = req.fields || {};

    const message = Message.create(content || '');

    res.turboStream.append('messages', {
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
    const message = Message.findById(req.params.messageId); 

    res.render('messages/edit', {
        message,
    })
});

// POST /messages/:messageId
//
// Updates existing message content
router.post('/:messageId', (req, res) => {
    const { content } = req.fields || {};
    const message = Message.updateById(req.params.messageId, content);

    res.render('messages/show', {
        message,
    });
});

// DELETE /messages/:messageId
//
// Deletes a message and removes the element with the id of "message_{id}".
router.delete('/:messageId', (req, res) => {
    const { messageId } = req.params;

    Message.removeById(messageId);

    res.turboStream.remove(`message_${messageId}`);
});

module.exports = router;