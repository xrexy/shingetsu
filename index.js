const Discord = require("discord.js");
const config = require("./config.json");
const client = new Discord.Client();
const fs = require("fs");

const commandFolder = './commands';

// CATEGORY IDs
// MODERATION = 0
// RANDOM = 1
// FUN = 2

console.log('kur');

client.commands = new Discord.Collection();
client.prefix = '>';

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

    console.log(jsfiles.length + ' files are loading...');

    jsfiles.forEach((registered, i) => {
      let props = require(commandFolder + '/' + registered);
      client.commands.set(registered.substr(0, registered.lastIndexOf('.')), props);
      console.log('[' + (i+1) + '] \'' + registered + '\' successfully loaded.');
    });
  });

client.login(config.TOKEN);

client.on('message', message => {
    if (message.author.bot) return;
    if (!message.content.startsWith(client.prefix)) return;

    const commandBody = message.content.slice(client.prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();
    
    let cmd = client.commands.get(command); 
    if(cmd != null) {
      try {
        cmd.execute(message.author, client, message);
      } catch(ex) {
        client.users.cache.get('192562679091691520').send(`**${message.author.username}** just tried using \'**${command}**\' command and received the following exception: \n\n${ex}\n\n[*${message.content}* | **${message.guild.name}**]`)
        console.log(ex);
      }
    } else {
      const embed = new Discord.MessageEmbed()
        .setColor('#ffffff')
        .setAuthor('Shingetsu Assistant', 'https://i.imgur.com/mW0dJur.jpg')
        .setThumbnail('https://i.imgur.com/mW0dJur.jpg')
        .addFields(
          { name: 'Moderation', value: '`/help moderation`', inline: true},
          { name: 'Online', value: '`/help online`', inline: true},
          { name: 'Random', value: '`/help random`', inline: true},
        )
        .setFooter('Response took ' + (Date.now() - message.createdTimestamp)/1000 + 's')
        .setTimestamp()

      message.channel.send({embed: embed});
    }
  });