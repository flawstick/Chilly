/*
	This will communicate with a web server
	and log application to the data, and will add it to database
*/

const {
	SlashCommandBuilder
} = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('apply')
		.setDescription('Apply to become staff!'),
	async execute(interaction) {
		await interaction.reply({
			content: 'This feature will be coming soon!',
			ephemeral: true
		});
	},
};