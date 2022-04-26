const {
    SlashCommandBuilder
} = require('@discordjs/builders');
const {
    MessageEmbed
} = require('discord.js');
const {
    join
} = require("path");

const {
    slap,
    awkward
} = require(join(process.cwd(), '/database/data/actions.json'));
const {
    Log
} = require(join(process.cwd(), '/utils/log.js'));

module.exports = {
    data: new SlashCommandBuilder()
        .setName('slap')
        .setDescription('Slap a guild member')
        .addUserOption(option =>
            option.setName('member')
            .setDescription('User to slap')
            .setRequired(true)),

    async execute(interaction) {
        const member = interaction.options.getUser('member');

        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setDescription(`${interaction.member.user} slapped the shit out of ${member}!`)
            .setImage(slap[(Math.round(Math.random()) * (slap.length - 1))])
            .setTimestamp()

        if (interaction.user.id === member.user.id) {
            embed.setImage(awkward[(Math.round(Math.random()) * (slap.length - 1))]);
            embed.setDescription(`We don't do that here 7bebe`);
        }

        await interaction.reply({
            embeds: [embed]
        });
        Log(`[INFO] [ACTION] [SLAP] ${interaction.member.user.tag} used slap on ${member.tag}`);
    },
};