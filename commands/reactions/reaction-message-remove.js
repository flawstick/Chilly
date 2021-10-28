const { readFile, writeFile } = require('fs');
const { join } = require('path');
const { checkMessageJsonArray, checkEmojiJsonArray } = require(join(process.cwd(), '/utils/reactions.js'));
const { Log } = require(join(process.cwd(), '/utils/log.js'));

const { SlashCommandBuilder } = require('@discordjs/builders');
const { reaction_roles_json, guildId } = require(join(process.cwd(), '/config.json'));

module.exports = {

	data: new SlashCommandBuilder()
		.setName('reaction-message-remove')
		.setDescription('Adds a reaction!')
		.addStringOption(option => 
			option.setName('message')
				.setRequired(true)
				.setDescription('Message ID with reaction roles.')),

	async execute(interaction) {

		// Get command options
		const messageId = interaction.options.getString('message');

		// Reply to message to get specefic channel
		const reply = await interaction.reply({ content: 'Attempting to delete reaction-role', fetchReply: true });

		// Fetch message using channel id from reply and given message id
		var message = null;
		try {
			message = await reply.channel.messages.fetch(messageId); // Fetch message
		} catch(error) {

			// Log error and delete message.
			Log(`[ERROR] [REACTION ROLES COMMAND] ${error} `);
			await reply.edit({ content: 'Could not find message' });
			reply.delete({timeout: 100000});
			return;
		}
		
		try {
			await message.delete;
		} catch (error) {

			// Log error and delete message.
			Log(`[ERROR] [REACTION ROLES COMMAND] ${error} `);
			await reply.edit({ content: 'Could not find emoji' });
			reply.delete({timeout: 100000});
			return;
		}

		// Add to json
		readFile(reaction_roles_json, 'utf-8', (err, data) => {
			if (err) throw err; // catch error

			// Load json data
			const reaction_roles = JSON.parse(data);

			// Check the existence of the gven message
			const existance = checkMessageJsonArray(reaction_roles["messages"] , messageId);
			if (existance === false) {

                // Log error and delete message.
			    Log(`[ERROR] [REACTION ROLES COMMAND] [REMOVE] [MESSAGE] Message ${messageId} does not contain any reaction roles!`);
			    reply.edit({ content: 'Message is not a reaction role message!' });
			    reply.delete({timeout: 100000});
			    return;
            }

			// Remove emoji from json message	
			reaction_roles.messages = reaction_roles.messages.splice(existance, 1);

			// Log to console
			Log("[INFO] [REACTION ROLES COMMAND] [REMOVE] [MESSAGE] Removed message: " + messageId);
			
			// Write the Json back into the file
			writeFile(reaction_roles_json, JSON.stringify(reaction_roles), (err) => {
                if (err) throw err; // Catch error
			});
			
		});

		// Inform of success
		reply.edit(`Reaction-Message! ${messageId} removed!`);
		reply.delete({timeout: 100000});
	}
};