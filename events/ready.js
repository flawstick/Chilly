const {
    initLog
} = require('../utils/log.js');
const {
    cacheReactionMessages
} = require('../utils/utils.js');
const {
    init
} = require('../database/connection.js');

const logger = require('../logger.js');
const {
    client
} = require('../index.js');

module.exports = {

    // Bot ready event
    name: 'ready',
    async execute(client) {

        // Make sure client is ready!
        //////////////////////////////////////////////////////////////////////////
        console.log(`[READY] [READY] [READY] Logged in as ${client.user.tag}`);

        // Initialise database connection and load data
        await init();

        // Initialize log function
        await initLog(client);
        console.log('[READY] [LOGGER] Logging started');

        // Initalize logger
        await logger.init(client);
        console.log('[READY] [LOGGER] [EVENT] Event logger ready');

        // Cache data for reaction messages
        await cacheReactionMessages(client);
        console.log('[READY] [REACTION MESSAGES] [CACHE] Fetched reaction messages data');
        //////////////////////////////////////////////////////////////////////////
    },

    // Ready event only occurs once
    once: true,
}