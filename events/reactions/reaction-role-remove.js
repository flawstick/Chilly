const { readFile } = require('fs');
const { join } = require('path'); 
const { Log } = require(join(process.cwd(), '/utils/logger.js'));

const { checkMessageJsonArray, checkEmojiJsonArray } = require(join(process.cwd(), '/utils/reactions.js'));
const { reaction_roles_json } = require(join(process.cwd(), '/config.json'));

module.exports = {

    // User join event
    name: 'messageReactionRemove',
    async execute(reaction, user) {

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
                const roleId = checkEmojiJsonArray(json["messages"], reaction.emoji.toString(), existance, reaction.message.id);
                const member = reaction.message.guild.members.cache.get(user.id); // Get member from user.id

                // Fetch the role using role id
                const role = reaction.message.guild.roles.cache.find(r => r.id === roleId);

                // check if a member even has the role (exception)
                if (member.roles.cache.has(role.id))

                    // Add the role to the guild member
                    member.roles.remove(role);

                // Log to console
                Log("[INFO] [REACTION ROLE] [REMOVE] The role [" + role.name + "] was remove from the guild member: " + member.user.tag);
            }
        });
    },
}