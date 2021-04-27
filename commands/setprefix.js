const validator = require('../utils/validator');

module.exports = {
    execute: (sender, client, message) => {
        if(!validator.isBotCreator(sender, client)) {
            message.channel.send('ye');
        }
    },
    name: 'setprefix',
    description: 'Change bot prefix',
    categoryID: 0
}