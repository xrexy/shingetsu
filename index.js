const Discord = require("discord.js");
const client = new Discord.Client();
const loader = require("./loader");

client.commands = new Discord.Collection();
client.assistant = new Discord.Collection();
client.config = require("./config.json");
client.prefix = client.config.PREFIX;

client.categoryNames = {
  '-1': "",
  '0': "Moderation",
  '1': "Random",
  '2': "Fun",
};
client.notifyCreator = (exception, message) => {
  client.users.cache.get('192562679091691520')
    .send(`**${message.author.username}** just received the following exception: \n\n${exception}\n\n[*${message.content}* | **${message.guild.name}**]`)     
}

loader.load(client);

client.login(client.config.TOKEN);

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
        client.notifyCreator(ex, message);
        console.log(ex);
      }
    } else {
      message.channel.send({embed: client.assistant[-1]});
    }
  });