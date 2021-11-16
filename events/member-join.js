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

    // Create welcome message
    const greetEmbed = new MessageEmbed()
        .setColor('#0099ff')
        .setAuthor(member.user.username, member.user.avatarURL())
        .setDescription(`Welcome to C H I L L V E R S E, ${member.user}`)
        .setImage(welcomeGif[(Math.round(Math.random()) * (welcomeGif.length - 1))])
        .setTimestamp()
        .setFooter('Have fun in our server!', member.guild.iconURL());

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