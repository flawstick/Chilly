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

    // get bye gifs
    const byeGifs = JSON.parse(byeGif);

    // Create removal message
    const greetEmbed = new MessageEmbed()
        .setColor('#0099ff')
        .setDescription(`Goodbye, ${member.user.tag}...`)
        .setImage(byeGif[(Math.round(Math.random()) * (byeGif.length - 1))])
        .setTimestamp()
        .setFooter(`Why'd you have to fuck off this way...`, member.avatar);

    return greetEmbed;
}

module.exports = {

    // User leave event
    name: 'guildMemberRemove',
    async execute(member) {
        Log(`[INFO] [LEAVE] [${member.user.tag}] has left the server...`);

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