const { initLog } = require('../utils/log.js');
const logger = require('../logger.js');
const { client } = require('../index.js');

module.exports = {

    // Bot ready event
    name: 'ready',
    async execute(client) {

        // Make sure client is ready!
        //////////////////////////////////////////////////////////////////////////
        console.log(`[READY] [READY] [READY] Logged in as ${client.user.tag}`); 
        await initLog(client);                                                       
        console.log('[READY] [LOGGER] Logging started');   
        await logger.init(client);
        console.log('[READY] [LOGGER] [EVENT] Event logger ready');                                                                     
        //////////////////////////////////////////////////////////////////////////
    },

    // Ready event only occurs once
    once: true,
}