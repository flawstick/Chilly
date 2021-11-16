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
        .setName('kick')
        .setDescription('Kick a player, for a reason.')
        .addUserOption(option =>
            option.setName(`user`)
            .setDescription(`The kicked user`)
            .setRequired(true))
        .addStringOption(option =>
            option.setName('reason')
            .setDescription('Reason the user will be kicked')
            .setRequired(true)),

    async execute(interaction) {

        // Set permissions
        if (interaction.member.permissions.has(Permissions.FLAGS.MUTE_MEMBERS) === false) {
            interaction.reply({
                content: `You're unable to use this command.`,
                ephemeral: true
            });
            Log(`[WARN] [KICK] ${interaction.member.user.tag} tried using ${interaction.name} command without permission.`);
            return;
        }

        var user, reason; // Accessiblity
        try {
            // Get interaction options
            user = interaction.options.getUser(`user`);
            reason = interaction.options.getString('reason');
        } catch (error) {
            Log(`[ERROR] [KICK] [${interaction.member.user.tag}] Couldn't process command options. Error: ${error}`);
            interaction.reply({
                content: `Couldn't process command options.`,
                ephemeral: true
            });
            return;
        }

        // Kick member
        try {
            await interaction.guild.members.cache.get(user.id).kick(reason); // Kicks member

        } catch (error) {
            Log(`[ERROR] [KICK] [${interaction.member.user.tag}] Could not kick guild member ${user.tag}, Error: ${error}`);
            interaction.reply({
                content: `Couldn't kick member`,
                ephemeral: true
            });
            return;
        }

        // Feedback, and log
        Log(`[INFO] [MUTE] [${interaction.member.user.tag}] ${user.tag} was kicked, Reason: ${reason}`);
        interaction.reply(`Successfully kicked ${user}! Reason: ${reason}`);
    },
}