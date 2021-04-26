const Discord = require("discord.js");

module.exports = {
    execute: (sender, client, message) => {
        let embed = new Discord.MessageEmbed()
            .setAuthor('Shingetsu Assistant', 'https://i.imgur.com/mW0dJur.jpg')
            .setThumbnail('https://i.imgur.com/mW0dJur.jpg')
            .addFields(
                { name: 'Moderation', value: '`/help moderation`', inline: true},
                { name: 'Random', value: '`/help random`', inline: true},
                { name: 'Fun', value: '`/help fun`', inline: true},
            )
        .setTimestamp()
        const args = message.content.split(' ');
        var cmds;
        if(args.length >= 2) {
            switch(args[1].toLowerCase()) {
                case 'moderation':
                    cmds = getCommandsByCategoryId(client, 0);
                    embed = new Discord.MessageEmbed()
                        .setAuthor('Shingetsu Assistant - Moderation', 'https://i.imgur.com/mW0dJur.jpg')
                        .addFields(
                            { name: `${cmds.text}`, value: `:black_circle: There are a total of ${cmds.size} commands registered.`}
                        )
                    break;
                case 'random':
                    cmds = getCommandsByCategoryId(client, 1);
                    embed = new Discord.MessageEmbed()
                        .setColor('#ffffff')
                        .setAuthor('Shingetsu Assistant - Random', 'https://i.imgur.com/mW0dJur.jpg')
                        .addFields(
                            { name: `${cmds.text}`, value: `:black_circle: There are a total of ${cmds.size} commands registered.`}
                        )
                    break;
                case 'fun':
                    cmds = getCommandsByCategoryId(client, 2);
                    embed = new Discord.MessageEmbed()
                        .setAuthor('Shingetsu Assistant - Fun', 'https://i.imgur.com/mW0dJur.jpg')
                        .addFields(
                            { name: `${cmds.text}`, value: `:black_circle: There are a total of ${cmds.size} commands registered.`}
                        )
                    break;
            }
        }
        message.channel.send({embed: embed});
    },
    name: 'help',
    description: 'Shingetsu assistant will walk you through the commands',
    categoryID: 1
}

function getCommandsByCategoryId(client, categoryID) {
    let output = [];
    client.commands.filter(cmd => cmd.categoryID == categoryID).forEach(command => {
        output.push('\`' + client.prefix + command.name + '\`\n' + command.description + '\n\n')
    })

    return {
        text: output.join(''),
        size: output.length
    };
}