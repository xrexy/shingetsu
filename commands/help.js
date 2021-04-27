const Discord = require("discord.js");

module.exports = {
    execute: (sender, client, message) => {
        let embed = client.assistant[-1];
        const args = message.content.split(' ');
        
        if(args.length >= 2) {
            switch(args[1].toLowerCase()) {
                case 'moderation':
                    embed = client.assistant[0];
                    break;
                case 'random':
                    embed = client.assistant[1];
                    break;
                case 'fun':
                    embed = client.assistant[2];
                    break;
            }
        }
        try {
            message.channel.send({embed: embed});
        } catch(ex) {
            client.notifyCreator(ex, message);
            console.log(ex);
        }
    },
    name: 'help',
    description: 'Shingetsu assistant will walk you through the commands',
    categoryID: 1
};