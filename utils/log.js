const { log } = require('../config.json');

var channel = null; // Channel variable
const initLog = async function(client) {
    channel = await client.channels.fetch(log); // Initialise variable
    console.log('[INFO] [LOGGER] Logger initialized!'); // Log initilization
}

// Logging into discord function
const logToDiscord = function (channel, string) {
    try {
        channel.send(string);
        return true;
    } catch (error) {
        console.log(`[ERROR] [LOGGER] ${error}`);
        return false;
    }
}

// Logging function
const Log = function(string) {
    console.log(string);
    logToDiscord(channel, string); // Declared above
}

module.exports = {
    Log,
    initLog
}

