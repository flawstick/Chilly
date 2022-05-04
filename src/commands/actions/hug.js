const {
    SlashCommandBuilder
} = require('@discordjs/builders');
const {
    MessageEmbed
} = require('discord.js');

const {
    hug,
    awkward
} = require('../ ../database/data/actions.json');
const {
    Log
} = require('../ ../utils/log.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('hug')
        .setDescription('Hug a guild member')
        .addUserOption(option =>
            option.setName('member')
            .setDescription('User to hug')
            .setRequired(true)),

    async execute(interaction) {
        const member = interaction.options.getUser('member');

        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setDescription(`${interaction.member.user} just hugged ${member}! Awww`)
            .setImage(hug[(Math.round(Math.random()) * (hug.length - 1))])
            .setTimestamp();

        if (interaction.user.id === member.id) {
            embed.setImage(awkward[(Math.round(Math.random()) * (hug.length - 1))]);
            embed.setDescription(`I'm sorry man I can't find the urge to make fun of you on this`);
        }

        await interaction.reply({
            embeds: [embed]
        });
        Log(`[INFO] [ACTION] [HUG]`, `${interaction.member.user.tag} used hug on ${member.tag}`);
    },
};