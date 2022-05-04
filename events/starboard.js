const {
    MessageEmbed
} = require('discord.js');
const {
    starCount,
    starboard
} = require('../config.json');
const {
    Log
} = require('../utils/log');


var channel = null; // Starboard channel
const starboardInit = async function (client) {
    channel = await client.channels.fetch(starboard); // Set variable
    console.log(`[INFO] [STARBOARD] Starboard Initialized!`); // Log initilization
}

// Check if message attachmenet is an image 
function checkImageURL(url) {
    return (url.match(/\.(jpeg|jpg|gif|png)$/) != null);
}

// Send starred message as embed
function sendStarred(message) {

    try {

        // Message embed
        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setAuthor(message.author.username, message.author.avatarURL())
            .setTitle(`⭐Message sent in ${message.channel}⭐`)
            .setDescription(`${message.content}`)
            .setThumbnail(welcomeGif[(Math.round(Math.random()) * (welcomeGif.length - 1))])
            .setFooter(`[Jump to message](${message.url})`)
            .setTimestamp()

        try {
            // Add first attachement if it's an image
            // (ik this is vanurable pls no hek me. i too lazy to fix)
            if (message.attachments.size > 0)
                if (checkImageURL(message.attachments.at(0)))
                    embed.setImage(message.attachments.at(0));
        } catch (error) {
            Log(`[ERROR] [STARBOARD]`, `${error}`); // hehehe dis might stop ur hack losser
        }

        // Send embed in starboard channel 
        channel.send({
            embeds: [embed]
        });
    } catch (error) {
        Log(`[ERROR] [STARBOARD]`, `${error}`);
    }
}

module.exports = {

    // Message event
    name: 'messageReactionAdd',
    async execute(reaction, user) {
        if (reaction.emoji.name !== "⭐") return;
        if (reaction.count !== starCount) return;
        sendStarred(reaction.message);
    },
    starboardInit // Add starboard initalizer
}