const {
    reaction_roles,
    color_roles,
    guildId
} = require('../../config.json');

// Cache everything needed for reaction roles.
const cacheReactionMessages = async function (client) {

    // Caching members for role management
    client.guilds.cache.get(guildId).members.fetch();

    // Cache channels 
    client.guilds.cache.get(guildId).channels.fetch();

    // Fetching discord messages in the reaction roles channel
    client.channels.cache.get(reaction_roles).messages.fetch();
    client.channels.cache.get(color_roles).messages.fetch();
}

const checkValueJsonArray = async function (array, value) {
    for (let i = 0; i < array.length; i++)
        if (array[i] === value)
            return i;
    return false;
}

module.exports = {
    checkValueJsonArray,
    cacheReactionMessages
}
