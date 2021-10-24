const { readFile, writeFile } = require('fs');
const { join } = require('path');

const { SlashCommandBuilder } = require('@discordjs/builders');
const { reaction_roles_json } = require(join(process.cwd(), '/config.json'));

module.exports = {

	data: new SlashCommandBuilder()
		.setName('reaction-role')
		.setDescription('Adds a reaction!')
		.addStringOption(option => 
			option.setName('message')
				.setRequired(true)
				.setDescription('Message ID with reaction roles.'))
		.addRoleOption(option =>
			option.setName('role')
				.setRequired(true)
				.setDescription('Role which the raction adds'))
		.addStringOption(option => 
			option.setName('emoji')
				.setRequired(true)
				.setDescription('Emoji which adds the role')),

	async execute(interaction) {

		// Get command options
		const messageId = interaction.options.getString('message');
		const role = interaction.options.getRole('role');
		const emoji = interaction.options.getString('emoji');

		// Reply to message to get specefic channel
		const reply = await interaction.reply({ content: 'attempting to add reaction role...', fetchReply: true });

		// Fetch message using channel id from reply and given message id
		var message = null;
		try {
			message = await reply.channel.messages.fetch(messageId); // Fetch message
		} catch(error) {

			// Log error and delete message.
			console.log(`[ERROR] [Reaction Roles Command] ${error} `);
			await reply.edit({ content: 'Could not find message' });
			reply.delete({timeout: 10000});
			return;
		}
		
		try {
			message.react(emoji); // Add reaction to the message
		} catch (error) {

			// Log error and delete message.
			console.log(`[ERROR] [Reaction Roles Command] ${error} `);
			await reply.edit({ content: 'Could not find emoji' });
			reply.delete({timeout: 10000});
			return;
		}

		// Add to json
		readFile(reaction_roles_json, 'utf-8', (err, data) => {
			if (err) throw err; // catch error

			// Load json data
			const reaction_roles = JSON.parse(data);

			// check existance of the message
			const check_exist = function (data, message) {
				for (let i = 0; i < data.messages.length; i++) 
					if (data.messages[i].hasOwnProperty(message.toString()))
						return i;
				return false;
			};

			// Check the existence of the gven message
			const existance = check_exist(reaction_roles, messageId);
			if (existance === false) {

				// Add message to json file
				const reaction_role = '{ ' + JSON.stringify(messageId.toString()) + ' : [{ ' + JSON.stringify(emoji) + ': ' + JSON.stringify(role.id) + ' }]}';			
				reaction_roles.messages.push(JSON.parse(reaction_role));

				// Log to console
				console.log("[INFO] [Reaction Roles Command] Added new message");
			} else {

				// Add roles to the message array object
				 const reaction_role = '{ ' + JSON.stringify(emoji) + ': ' + JSON.stringify(role.id) + ' }';
				 reaction_roles.messages[existance][messageId.toString()].push(JSON.parse(reaction_role));

				// Log to console
				console.log("[INFO] [Reaction Roles Command] Added new reaction to message: " + messageId.toString());
			}

			// Write the Json back into the file
			writeFile(reaction_roles_json, JSON.stringify(reaction_roles), (err) => {
				if (err) throw err; // catch error
			});
			
		});

		// Inform of success
		await reply.edit('New Reaction added!');
		reply.delete({timeout: 10000});
	}
};