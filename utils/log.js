const {
    MessageEmbed
} = require('discord.js');

const {
    log
} = require('../config.json');

const {
    client
} = require('../index');


var channel = null; // Channel variable
const initLog = async function (client) {
    channel = await client.channels.fetch(log); // Initialise variable
    console.log('[INFO] [LOGGER] Logger initialized!'); // Log initilization
}

// Store in variables so the application doesn't fetch them every single time it logs
const username = client.user.username; // Username of bot
const avatarURL = client.user.avatarURL(); // Avatar of bot

// Logging into discord function
const logToDiscord = function (channel, tags ,string) {
    try {
        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setAuthor(username, avatarURL)
            .setTitle(`Tags: ${tags}`)
            .setDescription(string)
            .setThumbnail(welcomeGif[0])
            .setTimestamp()

        channel.send({ embeds: [embed] });
        return true;
    } catch (error) {
        console.log(`[ERROR] [LOGGER] ${error}`);
        return false;
    }
}

// Logging function
const Log = function (tags, string) {
    console.log(tags + " " + string);
    logToDiscord(channel, string); // Declared above
}

module.exports = {
    Log,
    initLog
}