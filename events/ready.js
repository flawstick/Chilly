const { initLogger } = require('../utils/logger.js');

module.exports = {

    // Bot ready event
    name: 'ready',
    async execute(client) {

        // Make sure client is ready!
        //////////////////////////////////////////////////////////////////////////
        console.log(`[READY] [READY] [READY] Logged in as ${client.user.tag}`);///   
        await initLogger();                                                    /// 
        console.log('[READY] [LOGGER] Logging stars: \n');                     ///
        //////////////////////////////////////////////////////////////////////////
    },

    // Ready event only occurs once
    once: true,
}