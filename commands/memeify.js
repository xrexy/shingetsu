const alphabet = {
    a: '🇦',
    b: '🇧',
    c: '🇨',
    d: '🇩',
    e: '🇪',
    f: '🇫',
    g: '🇬',
    h: '🇭',
    i: '🇮',
    j: '🇯',
    k: '🇰',
    l: '🇱',
    m: '🇲',
    n: '🇳',
    o: '🇴',
    p: '🇵',
    q: '🇶',
    r: '🇷',
    s: '🇸',
    t: '🇹',
    u: '🇺',
    v: '🇻',
    w: '🇼',
    x: '🇽',
    y: '🇾',
    z: '🇿'
}

module.exports = {
    execute: (sender, client, message) => {
        let split_text = message.content.split(' ');
        let words = split_text.slice(1, split_text.length);
        let letters = [];
        words.forEach(word => {
            word.split('').forEach(letter => {
                letters.push(letter.toLowerCase());
            })
        })

        let output = '';
        var x;
        letters.forEach(letter => {
            x = alphabet[letter]
            x != null ? output += `${x} ` : output += '';
        });
        message.channel.send(output);
    },
    name: 'memeify',
    description: 'Make dank messages danker',
    categoryID: 2
}