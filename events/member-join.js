const {
    Log
} = require('../utils/log.js');

const {
    MessageEmbed
} = require('discord.js');
const {
    welcome,
    chat,
    welcomeGif
} = require('../config.json')

// Return a MessageEmbed
function getEmbed(member) {

    // Get welcome gifs
    const welcomeGifs = JSON.parse(welcomeGif);

    // Create welcome message
    const greetEmbed = new MessageEmbed()
        .setColor('#0099ff')
        .setDescription(`Welcome to C H I L L V E R S E, ${member.user.tag}`)
        .setImage(welcomeGifs[(Math.random() * welcomeGifs.length)])
        .setTimestamp()
        .setFooter('Have fun in our server!', member.avatar);

    return greetEmbed;
}

module.exports = {

    // User join event
    name: 'guildMemberAdd',
    async execute(member) {
        Log(`[INFO] [JOIN] [${member.user.tag}] has joined the server!`);

        // Welcome in welcome channel
        member.guild.channels.cache.find(channel => channel.id === welcome).send({
            embeds: [getEmbed(member)]
        });

        // Welcome in chat channel
        member.guild.channels.cache.find(channel => channel.id === chat).send({
            embeds: [getEmbed(member)]
        });
    },
}