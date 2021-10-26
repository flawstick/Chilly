const { readFile } = require('fs');
const { join } = require('path'); 
const { Log } = require(join(process.cwd(), '/utils/logger.js'));

const { checkMessageJsonArray, checkEmojiJsonArray } = require(join(process.cwd(), '/utils/reactions.js'));
const { reaction_roles_json, clientId } = require(join(process.cwd(), '/config.json'));

module.exports = {

    // User join event
    name: 'messageReactionAdd',
    async execute(reaction, user) {
        if (user.id === clientId) return; // check if the user isn't a bot

        // Read json for message and roles
        readFile(reaction_roles_json, (err, data) => {
            if (err) throw err;

            // Parse into json object
            const json = JSON.parse(data);

            // Get existance (see util declaration)
            const existance = checkMessageJsonArray(json["messages"], reaction.message.id);

            // If the message exists 
            if (existance !== false) {

                // Get the role id (see util declaration)
                const roleId = checkEmojiJsonArray(json["messages"], reaction.emoji, existance, reaction.message.id);
                const member = reaction.message.guild.members.cache.get(user.id); // Get member from user.id

                // Fetch the role using role id
                const role = reaction.message.guild.roles.cache.find(r => r.id === roleId);

                // Add the role to the guild member
                member.roles.add(role);

                // Log to console
                Log("[INFO] [REACTION ROLE] [ADD] The role [" + role.name + "] was added to guild member: " + member.user.tag);
            }
        });
    },
}