const {
    readFile
} = require('fs');

const {
    Log
} = require('../../utils/log.js');
const {
    checkMessageJsonArray,
    getEmojiJsonArray
} = require('../../utils/reactions.js');
const {
    reaction_roles_json
} = require('../../../config.json');

module.exports = {

    // User join event
    name: 'messageReactionRemove',
    async execute(reaction, user) {

        // Read json for message and roles
        readFile(reaction_roles_json, (err, data) => {
            if (err) return console.log(err);

            // Parse into json object
            const json = JSON.parse(data);

            // Get existance (see util declaration)
            const existance = checkMessageJsonArray(json["messages"], reaction.message.id);

            // If the message exists 
            if (existance !== false) {
                try {
                    // Get the role id (see util declaration)
                    const roleId = getEmojiJsonArray(json["messages"], reaction.emoji.toString(), existance, reaction.message.id);
                    const member = reaction.message.guild.members.cache.get(user.id); // Get member from user.id

                    // Fetch the role using role id
                    const role = reaction.message.guild.roles.cache.find(r => r.id === roleId);

                    // check if a member even has the role (exception)
                    if (member.roles.cache.has(roleId))

                        // Add the role to the guild member
                        member.roles.remove(role);

                    // Log to console
                    Log(`[INFO] [REACTION ROLE] [REMOVE]`, `The role [${role.name}] was removed from the guild member: ${member.user.tag}`);
                } catch (error) {
                    // Catch HTTP fetch error, cache error
                    Log(`[ERROR] [REACTION ROLE] [REMOVE]`, `Couldn't remove role, Error: ${error}`);
                }
            }
        });
    },
}