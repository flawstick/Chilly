const {
    addXP
} = require('../database/levels.js');
const {
    clientId
} = require('../config.json');

module.exports = {

    // Message event
    name: 'messageCreate',
    async execute(message) {
        if (message.author.id === clientId) return; // Ignore if it's the bot

        // Add xp to the user that sent the message
        addXP(message.author.id, 50);

        // 1. 1000, 2. 1000 * 1.2, 3. 1000 * 1.2 ^ 2 chain system
    },
}