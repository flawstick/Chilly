const {
    SlashCommandBuilder
} = require("@discordjs/builders");
const {
    Permissions
} = require('discord.js');
const {
    Log
} = require('../utils/log');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('pardon')
        .setDescription('Unban a player, for a reason.')
        .addStringOption(option =>
            option.setName(`userid`)
            .setDescription(`The banned user's id`)
            .setRequired(true))
        .addStringOption(option =>
            option.setName('reason')
            .setDescription('Reason the user will be unbanned')
            .setRequired(true)),

    async execute(interaction) {

        // Set permissions
        if (interaction.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS) === false) {
            interaction.reply({
                content: `You're unable to use this command.`,
                ephemeral: true
            });
            Log(`[WARN] [PARDON] ${interaction.member.user.tag} tried using ${interaction.name} command without permission.`);
            return;
        }

        var user, reason; // Accessibility
        try {
            // Get interaction options
            user = interaction.options.getString(`userid`);
            reason = interaction.options.getString('reason');

        } catch (error) {
            Log(`[ERROR] [PARDON] [${interaction.member.user.tag}] Couldn't process command options. Error: ${error}`);
            interaction.reply({
                content: `Couldn't process command options.`,
                ephemeral: true
            });
            return;
        }

        try {
            await interaction.guild.bans.remove(user, reason);
        } catch (error) {
            Log(`[ERROR] [PARDON] [${interaction.member.user.tag}] Could not unban guild member ${user.tag}, Error: ${error}`);
            interaction.reply({
                content: `Couldn't unban member`,
                ephemeral: true
            });
            return;
        }

        // Feedback, and log
        Log(`[INFO] [PARDON] [${interaction.member.user.tag}] Successfully unbanned ${user.tag} , Reason: ${reason}`);
        interaction.reply(`Successfully unbanned ${user}! Reason: ${reason}`);
    },
}