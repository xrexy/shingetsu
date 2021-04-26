module.exports = {
    execute: (sender, client, message) => {
        message.channel.send(`🏓Latency is ${Date.now() - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`);
    },
    name: 'ping',
    description: 'bing gping no',
    categoryID: 1
}