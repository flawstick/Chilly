const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { join } = require("path");

const { fuck } = require(join(process.cwd(), '/database/data/actions.json'));
const { Log } = require(join(process.cwd(), '/utils/log.js'));

module.exports = {
	data: new SlashCommandBuilder()
		.setName('fuck')
		.setDescription('Fuck a guild member')
        .addUserOption(option =>
            option.setName('member')
             .setDescription('User to fuck')
             .setRequired(true)),

	async execute(interaction) {
		const member = interaction.options.getUser('member');

        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setDescription(`${interaction.member.user} fucked ${member}! Premarital sex btw.`)
            .setImage(fuck[(Math.round(Math.random()) * (fuck.length - 1))])
            .setTimestamp();
            
        await interaction.reply({ embeds: [embed] });
        Log(`[INFO] [ACTION] [FUCK] ${interaction.member.user.tag} used fuck on ${member.tag}`);
	},
};