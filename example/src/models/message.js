const messages = [
    {
        id: 1,
        content: 'Hello, world',
    },
    {
        id: 2,
        content: 'Try this',
    },
    {
        id: 3,
        content: 'Again',
    }
];

const findIndex = (messageId) => messages.findIndex(({ id}) => id === parseInt(messageId));

module.exports.updateById = (id, content) => {
    const index = findIndex(id);

    messages[index].content = content;

    return messages[index];
}

module.exports.create = (content) => {
    const { id } = messages[messages.length - 1]

    const message = {
        id: id + 1,
        content,
    };

    messages.push(message);

    return message;
}

module.exports.findById = (messageId) => messages.find(({id}) => id === parseInt(messageId));

module.exports.removeById = (messageId) => {
    const index = findIndex(messageId);

    if (index !== -1) {
        messages.splice(index, 1)
    }
}

module.exports.all = () => messages;