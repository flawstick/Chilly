const {
	readFile,
	writeFile
} = require('fs');
const {
	SlashCommandBuilder
} = require('@discordjs/builders');
const {
	Permissions
} = require('discord.js');

const {
	checkMessageJsonArray,
} = require('../../utils/reactions.js');
const {
	Log
} = require('../../utils/log.js');
const {
	reaction_roles_json
} = require('../../../config.json');

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
			.setDescription('Emoji which adds the role'))
		.addIntegerOption(option =>
			option.setName('max')
			.setRequired(false)
			.setDescription('The amount of roles a user can get from this message')),

	async execute(interaction) {

		// Set permissions
		if (interaction.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR) === false) {
			interaction.reply({
				content: `You're unable to use this command.`,
				ephemeral: true
			});
			Log(`[WARN] [REACTION ROLE COMMAND]`, `${interaction.member.user.tag} tried using reaction role command without permission.`);
			return;
		}

		// Get command options
		const messageId = await interaction.options.getString('message');
		const role = await interaction.options.getRole('role');
		const emoji = await interaction.options.getString('emoji');
		var max = await interaction.options.getInteger('max');


		// Reply to message to get specefic channel
		const reply = await interaction.reply({
			content: 'attempting to add reaction role...',
			fetchReply: true
		});

		// Fetch message using channel id from reply and given message id
		var message = null;
		try {
			message = await reply.channel.messages.fetch(messageId); // Fetch message
		} catch (error) {

			// Log error and delete message.
			Log(`[ERROR] [REACTION ROLES COMMAND]`, `${error}`);
			await reply.edit({
				content: 'Could not find message'
			});
			reply.delete({
				timeout: 100000
			});
			return;
		}

		try {
			message.react(emoji); // Add reaction to the message
		} catch (error) {

			// Log error and delete message.
			Log(`[ERROR] [REACTION ROLES COMMAND]`, `${error}`);
			await reply.edit({
				content: 'Could not find emoji'
			});
			await reply.delete({
				timeout: 100000
			});
			return;
		}

		// Add to json
		readFile(reaction_roles_json, 'utf-8', (err, data) => {
			if (err) throw err; // catch error

			// Load json data
			const reaction_roles = JSON.parse(data);

			// Check the existence of the gven message
			const existance = checkMessageJsonArray(reaction_roles["messages"], messageId);
			if (existance === false) {

				// Make sure max isn't null for players to interact
				if (max === null) {
					console.log(`[WARN] [REACTION ROLE COMMAND] [NO MAX]`, `No max has been set, set to 50`);
					max = 50;
				}

				// Add message to json file
				const reaction_role = '{ ' + JSON.stringify(messageId.toString()) + ' : [{ ' + JSON.stringify(emoji) + ': ' + JSON.stringify(role.id) + ' }], "max": ' + JSON.stringify(max) + '}';
				reaction_roles.messages.push(JSON.parse(reaction_role));

				// Log to console
				Log(`[INFO] [REACTION ROLES COMMAND] [MESSAGE]`, `Added new message`);
			} else {

				// Add roles to the message array object
				const reaction_role = '{ ' + JSON.stringify(emoji) + ': ' + JSON.stringify(role.id) + ' }';
				reaction_roles.messages[existance][messageId.toString()].push(JSON.parse(reaction_role));

				// Change max to new assigned value
				if (max !== null)
					reaction_roles.messages[existance]["max"] = max;

				// Log to console
				Log(`[INFO] [REACTION ROLES COMMAND] [REACTION]`, `Added new reaction to message: ${messageId.toString()}`);
			}

			// Write the Json back into the file
			writeFile(reaction_roles_json, JSON.stringify(reaction_roles), (err) => {
				if (err) throw err; // catch error
			});

		});


		// Inform of success
		await reply.edit('New Reaction added!');
		reply.delete({
			timeout: 100000
		});
	}
};