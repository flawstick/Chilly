const {
    SlashCommandBuilder
} = require('@discordjs/builders');
const {
    MessageEmbed
} = require('discord.js');

const {
    kiss,
    awkward
} = require('../../database/data/actions.json');
const {
    Log
} = require('../../utils/log.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kiss')
        .setDescription('Kiss a guild member')
        .addUserOption(option =>
            option.setName('member')
            .setDescription('User to kiss')
            .setRequired(true)),

    async execute(interaction) {
        const member = interaction.options.getUser('member');

        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setDescription(`${interaction.member.user} kissed ${member} <3`)
            .setImage(kiss[(Math.round(Math.random()) * (kiss.length - 1))])
            .setTimestamp();

        if (interaction.user.id === member.id) {
            embed.setImage(awkward[(Math.round(Math.random()) * (kiss.length - 1))]);
            embed.setDescription(`Nyakat`);
        }

        await interaction.reply({
            embeds: [embed]
        });
        Log(`[INFO] [ACTION] [KISS]`, `${interaction.member.user.tag} used kiss on ${member.tag}`);
    },
};