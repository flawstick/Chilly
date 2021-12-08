const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { join } = require("path");

const { kiss } = require(join(process.cwd() ,'/database/data/actions.json'));
const { Log } = require(join(process.cwd(), '/utils/log.js'));

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
            
        await interaction.reply({ embeds: [embed] });
        Log(`[INFO] [ACTION] [KISS] ${interaction.member.user.tag} used kiss on ${member.tag}`);
	},
};