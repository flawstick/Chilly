const {
    MessageEmbed
} = require('discord.js');
const {
    starCount,
    starboard,
    welcomeGif
} = require('../config.json');
const {
    Log
} = require('../utils/log');


var channel = null; // Starboard channel
var starredMessages = null; // Starred messages since startup
const starboardInit = async function (client) {
    channel = await client.channels.fetch(starboard); // Set variable
    console.log(`[INFO] [STARBOARD] Starboard Initialized!`); // Log initilization

    // starred messages id array
    starredMessages = [];
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
            .setDescription(`${message.content} ([Jump to message!](${message.url}))`)
            .setThumbnail(welcomeGif[(Math.round(Math.random()) * (welcomeGif.length - 1))])
            .setFooter(`⭐${message.id}⭐`)
            .setTimestamp()

        try {

            // Add first attachement if it's an image
            // (ik this is vanurable pls no hek me. i too lazy to fix)
            if (message.attachments.size > 0)
                if (checkImageURL(message.attachments.at(0).url))
                    embed.setImage(message.attachments.at(0).url);
        } catch (error) {
            Log(`[ERROR] [STARBOARD]`, `${error}`); // hehehe dis might stop ur hack losser
        }

        // Send embed in starboard channel 
        channel.send({
            content: `⭐Message starred in ${message.channel}⭐`, 
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
        if (starboard === reaction.message.channel.id) return; // Check if channel isn't starboard
        if (reaction.emoji.toString() !== "⭐") return; // Check if it's a star emoji
        if (reaction.count !== starCount) return; // Check if it meets the star count

        for (let i = 0; i < starredMessages.length; i++) // Loop through caches starred messages
            if (starredMessages[i] === `${reaction.message.id}`) return; // Return if already starred

        // Send the message in starboard channel
        sendStarred(reaction.message);

        // Add it to array so it doesn't send again
        starredMessages.push(`${reaction.message.id}`);

        // Log that a message got starred
        Log(`[INFO] [STARBOARD]`, `A [message](${reaction.message.url}) was starred in ${reaction.message.channel}`)
    },
    starboardInit // Add starboard initalizer
}