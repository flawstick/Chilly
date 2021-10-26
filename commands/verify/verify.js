/*
    This file is in it's own folder because it will collect data and make it into data
    then database will update it every 30 minutes
*/

const { SlashCommandBuilder } = require('@discordjs/builders');
const { residentRole, verify } = require('../config.json');
const { Log } = require('../utils/logger');

module.exports = {

	data: new SlashCommandBuilder()
		.setName('verify')
		.setDescription('Verify yourself as a resident'),

	async execute(interaction) {
        if (interaction.channel.id !== verify) return; // Return if the it's not in verify channel

        // Check if player isn't verified
        if (!interaction.member.roles.cache.has(residentRole)) {

            // Add role to member
            await interaction.member.roles.add(residentRole);

            // Reply to message ephemerally
            await interaction.reply({content: `Verified!`, ephemeral: true});

            // Log output
            Log(`[INFO] [VERIFY] [${interaction.member.user.tag}] verified as a human and is now a resident!`);
        }
        else {

            // Reply to message ephemerally
            await interaction.reply({ content: `You're already verified!`, ephemeral: true });

            // Log output
            Log(`[WARN] [VERIFY] [${interaction.member.user.tag}] tried to verify when they alrady are!`);
        }
	},
};