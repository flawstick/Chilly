const { SlashCommandBuilder } = require('@discordjs/builders');
const { residentRole, verify } = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('verify')
		.setDescription('Verify yourself as a resident'),
	async execute(interaction) {
        if (interaction.channel.name !== verify) return;

        if (!interaction.member.roles.cache.has(residentRole)) {
            await interaction.member.roles.add(residentRole);
            await interaction.reply({content: `Verified!`, ephemeral: true});
        }
        else
            await interaction.reply({ content: `You're already verified!`, ephemeral: true });
	},
};