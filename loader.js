const Discord = require("discord.js");
const fs = require("fs");

const commandFolder = "./commands";

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

module.exports.load = (client) => {
    const loadCommands = new Promise((resolve, reject) => {
        fs.readdir(commandFolder, (err, files) => {
            if(err) {
                console.log(err);
                return;
            }
            
            let jsfiles = files.filter(file => file.split(".").pop() === "js");
            if(jsfiles.length <= 0) {
                console.log("There are no commands to register!");
                return;
            }
            
            console.log(`\nLoading ${jsfiles.length} files...\n`);
            
            jsfiles.forEach((registered, i) => {
                let props = require(commandFolder + '/' + registered);
                client.commands.set(registered.substr(0, registered.lastIndexOf('.')), props);
                console.log(`[${(i+1)}] \'${registered}\' successfully loaded!`);
            });
            resolve();
            console.log(`\nSuccessfully loaded ${client.commands.size} commands!`)
        });
    });

    loadCommands.then(() => {
        console.log('\n\nLoading assistant responses...')
        client.assistant[-1] = new Discord.MessageEmbed()
            .setAuthor('Shingetsu Assistant', 'https://i.imgur.com/mW0dJur.jpg')
            .setThumbnail('https://i.imgur.com/mW0dJur.jpg')
            .addFields(
                { name: 'Moderation', value: `\`${client.prefix}help moderation\``, inline: true},
                { name: 'Random', value: `\`${client.prefix}help random\``, inline: true},
                { name: 'Fun', value: `\`${client.prefix}help fun\``, inline: true},
            )
            .setTimestamp();

        var cmds;
        for (i = 0; i <= 2; i++) {
            cmds = getCommandsByCategoryId(client, i);
            client.assistant[i] = new Discord.MessageEmbed()
                .setAuthor(`Shingetsu Assistant - ${client.categoryNames[`${i}`]}`, 'https://i.imgur.com/mW0dJur.jpg')
                .addFields(
                    { name: `${cmds.text}`, value: `\n:clipboard: There are a total of ${cmds.size} commands registered.`}
                 );
        }
        console.log(`Successfully loaded ${client.assistant.size} assistant responses!`);
    });
};