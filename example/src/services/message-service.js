let messages = [
  {
    id: 1,
    content: 'Hello, world',
    roomId: 0,
  },
  {
    id: 2,
    content: 'Try this',
    roomId: 0,
  },
  {
    id: 3,
    content: 'Again',
    roomId: 0,
  }
];

class MessageService {
  static getNextId() {
    if (!messages.length) {
      return 1;
    }

    const { id: lastId } = messages[messages.length - 1];
    return lastId + 1;
  }

  static updateById(id, content) {
    const index = this._findIndex(id);

    messages[index].content = content;

    return messages[index];
  }

  static create(content, roomId) {
    const message = {
      id: this.getNextId(),
      content,
      roomId,
    };

    messages.push(message);

    return message;
  }

  static findById(messageId) {
    return messages.find(({id}) => id === parseInt(messageId));
  }

  static removeById(messageId) {
    const index = this._findIndex(messageId);

    if (index !== -1) {
      messages.splice(index, 1)
    }
  }

  static all(roomId) {
    return messages.filter((m) => m.roomId === roomId);
  }

  static _findIndex(messageId) {
    return messages.findIndex(({ id}) => id === parseInt(messageId));
  }
}

module.exports = MessageService;