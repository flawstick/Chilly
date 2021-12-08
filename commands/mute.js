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
        .setName('mute')
        .setDescription('Mute a player, for a reason.')
        .addUserOption(option =>
            option.setName(`user`)
            .setDescription(`The muted user`)
            .setRequired(true))
        .addStringOption(option =>
            option.setName('reason')
            .setDescription('Reason the user will be muted')
            .setRequired(true)),

    async execute(interaction) {

        // Set permissions
        if (interaction.member.permissions.has(Permissions.FLAGS.MUTE_MEMBERS) === false) {
            interaction.reply({
                content: `You're unable to use this command.`,
                ephemeral: true
            });
            Log(`[WARN] [MUTE] ${interaction.member.user.tag} tried using ${interaction.name} command without permission.`);
            return;
        }

        var user, reason; // Cast outside of try catch for accessibility
        try {
            // Get interaction options
            user = interaction.options.getUser(`user`);
            reason = interaction.options.getString('reason');
        } catch (error) {
            Log(`[ERROR] [MUTE] [${interaction.member.user.tag}] Couldn't process command options. Error: ${error}`);
            interaction.reply({
                content: `Couldn't process command options.`,
                ephemeral: true
            });
            return;
        }

        var flag; // Muted / Unmuted
        try {

            // Init member variable instead of continious fetching.
            const member = interaction.guild.members.cache.get(user.id);

            // Mute/ Unmute member
            if (member.roles.cache.find(role => role.name === 'Muted') === undefined) {
                await member.roles.add(interaction.guild.roles.cache.find(role => role.name === 'Muted'), reason); // Mutes member
                flag = `muted`;
            } else {
                await member.roles.remove(interaction.guild.roles.cache.find(role => role.name === 'Muted'), reason); // Unmutes member
                flag = `unmuted`;
            }

        } catch (error) {
            Log(`[ERROR] [MUTE] [${interaction.member.user.tag}] Could not mute/unmute guild member ${user.tag}, Error: ${error}`);
            interaction.reply({
                content: `Couldn't mute/unmute member`,
                ephemeral: true
            });
            return;
        }

        // Feedback, and log
        Log(`[INFO] [MUTE] [${interaction.member.user.tag}] ${user.tag} was ${flag}, Reason: ${reason}`);
        interaction.reply(`Successfully ${flag} ${user}! Reason: ${reason}`);
    },
}