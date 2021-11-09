const {
    noMessage,
    clientId
} = require('../config.json');
const {
    Log
} = require('../utils/log.js');
const {
    checkValueJsonArray
} = require('../utils/utils.js');

module.exports = {

    // Message event
    name: 'messageCreate',
    async execute(message) {
        if (message.author.id === clientId) return; // Ignore if it's the bot

        // Check if the value exists (check declaration in utils)
        const existance = await checkValueJsonArray(noMessage, message.channel.id);
        if (existance === false) return; // Return if channel does not exist

        // Log attempt
        Log(`[WARN] [ILLEGAL MESSAGE] ${message.author.tag} tried to send a message to channel: ${message.channel.name}`);
        await message.delete(); // Delete message

        // Log deletion
        Log(`[WARN] [ILLEGAL MESSAGE] Illegal message sent by ${message.author.tag} deleted.`);
    },
}