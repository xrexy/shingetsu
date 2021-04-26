const uwus = ['uwu', 'UwU', '*uwu*', '*UwU*', '**uwu**', '**UwU**', '***uwu***', '***UwU***', 'u w u', '*u w u*', '**u w u**', '***u w u***', 'U w U', '*U w U*', '**U w U**', '***U w U***'];

module.exports = {
    execute: (sender, client, message) => {
        message.channel.send(uwus[Math.floor(Math.random() * uwus.length)]);
    },
    name: 'uwu',
    description: 'Recieve extraordinary amounts of cute',
    categoryID: 2
}