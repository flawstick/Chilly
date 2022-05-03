const {
    Log
} = require('../utils/log.js');

const {
    MessageEmbed
} = require('discord.js');
const {
    bye,
    chat,
    byeGif
} = require('../config.json')

// Return a MessageEmbed
function getEmbed(member) {

    // Create removal message
    const greetEmbed = new MessageEmbed()
        .setColor('#0099ff')
        .setAuthor(member.user.username, member.user.avatarURL())
        .setDescription(`Goodbye, ${member.user}...`)
        .setImage(byeGif[(Math.round(Math.random()) * (byeGif.length - 1))])
        .setThumbnail(byeGif[(Math.round(Math.random()) * (byeGif.length - 1))])
        .setTimestamp()
        .setFooter(`Why'd you have to fuck off this way...`, member.guild.iconURL());

    return greetEmbed;
}

module.exports = {

    // User leave event
    name: 'guildMemberRemove',
    async execute(member) {
        Log(`[INFO] [LEAVE]`, `[${member.user.tag}] has left the server...`);

        // Bye in bye channel
        member.guild.channels.cache.find(channel => channel.id === bye).send({
            embeds: [getEmbed(member)]
        });

        // Bye in chat channel
        member.guild.channels.cache.find(channel => channel.id === chat).send({
            embeds: [getEmbed(member)]
        });
    },
}