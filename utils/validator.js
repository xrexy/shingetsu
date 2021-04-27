module.exports = {
    isBotCreator: (author, client) => {
        return author.id === client.config.CREATOR_ID;
    }
}