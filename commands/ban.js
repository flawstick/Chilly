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
        .setName('ban')
        .setDescription('Ban a player, for a reason.')
        .addUserOption(option =>
            option.setName(`user`)
            .setDescription(`The banned user`)
            .setRequired(true))
        .addStringOption(option =>
            option.setName('reason')
            .setDescription('Reason the user will be banned')
            .setRequired(true))
        .addIntegerOption(option =>
            option.setName('time')
            .setDescription('The period of time the player will be banned. (in days)')
            .setRequired(false)),

    async execute(interaction) {

        // Set permissions
        if (interaction.member.permissions.has(Permissions.FLAGS.MUTE_MEMBERS) === false) {
            interaction.reply({
                content: `You're unable to use this command.`,
                ephemeral: true
            });
            Log(`[WARN] [BAN] ${interaction.member.user.tag} tried using ${interaction.name} command without permission.`);
            return;
        }

        var user, reason, time; // Accessibility
        try {
            // Get interaction options
            user = interaction.options.getUser(`user`);
            reason = interaction.options.getString('reason');
            time = interaction.options.getInteger('time');

            if (time === undefined)
                time = 1; // Not require option default.
        } catch (error) {
            Log(`[ERROR] [BAN] [${interaction.member.user.tag}] Couldn't process command options. Error: ${error}`);
            interaction.reply({
                content: `Couldn't process command options.`,
                ephemeral: true
            });
            return;
        }

        try {
            await interaction.guild.members.cache.get(user.id).ban({
                days: time,
                reason: reason
            });

        } catch (error) {
            Log(`[ERROR] [BAN] [${interaction.member.user.tag}] Could not ban guild member ${user.tag}, Error: ${error}`);
            interaction.reply({
                content: `Couldn't ban member`,
                ephemeral: true
            });
            return;
        }

        // Feedback, and log
        Log(`[INFO] [BAN] [${interaction.member.user.tag}] Successfully banned ${user.tag} , Reason: ${reason}`);
        interaction.reply(`Successfully banned ${user}! Reason: ${reason}`);
    },
}