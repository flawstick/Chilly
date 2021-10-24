const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('fs');

module.exports = {

	data: new SlashCommandBuilder()
		.setName('reaction-role')
		.setDescription('Replies with server info!')
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
		const reply = await interaction.reply({ content: 'Adding reaction role...', fetchReply: true,  ephermal: true });

		// Fetch message using channel id from reply and given message id
		const message = await reply.channel.messages.fetch(messageId);

		// Add reaction to the message
		message.react(emoji);	

		// Add to json
		fs.readFile('events/reactions/reaction-roles.json', 'utf-8', (err, data) => {
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

			const existance = check_exist(reaction_roles, messageId);

			console.log(existance);
			if (existance === false) {

				// Add message to json file
				const reaction_role = '{ ' + JSON.stringify(messageId.toString()) + ' : [{ ' + JSON.stringify(emoji) + ': ' + JSON.stringify(role.id) + ' }]}';			
				reaction_roles.messages.push(JSON.parse(reaction_role));

				console.log('if ran'); //debug
			} else {

				// Add roles to the message array object
				 const reaction_role = '{ ' + JSON.stringify(emoji) + ': ' + JSON.stringify(role.id) + ' }';
				 reaction_roles.messages[existance]["901858163614179368"].push(JSON.parse(reaction_role));
			}

			// Write the Json back into the file
			fs.writeFile('events/reactions/reaction-roles.json', JSON.stringify(reaction_roles), (err) => {
				if (err) throw err; // catch error
			});
			
		});
	}
};