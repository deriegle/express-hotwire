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

const getNextId = () => {
    if (messages.length) {
        const { id: lastId } = messages[messages.length - 1]
        return  lastId + 1;
    } else {
        return 1;
    }
}

const updateById = (id, content) => {
    const index = findIndex(id);

    messages[index].content = content;

    return messages[index];
}

const create = (content) => {
    const message = {
        id: getNextId(),
        content,
    };

    messages.push(message);

    return message;
}

const findById = (messageId) => messages.find(({id}) => id === parseInt(messageId));

const removeById = (messageId) => {
    const index = findIndex(messageId);

    if (index !== -1) {
        messages.splice(index, 1)
    }
}

const all = () => messages;

module.exports = {
    updateById,
    create,
    findById,
    removeById,
    all,
};