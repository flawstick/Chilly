const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { join } = require("path");

const { kill } = require(join(process.cwd(), '/database/data/actions.json'));
const { Log } = require(join(process.cwd(), '/utils/log.js'));

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kill')
		.setDescription('Kill a guild member')
        .addUserOption(option =>
            option.setName('member')
             .setDescription('User to kill')
             .setRequired(true)),

	async execute(interaction) {
		const member = interaction.options.getUser('member');

        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setDescription(`${interaction.member.user} just murdered ${member}! Psycho!!`)
            .setImage(kill[(Math.round(Math.random()) * (kill.length - 1))])
            .setTimestamp();
            
        await interaction.reply({ embeds: [embed] });
        Log(`[INFO] [ACTION] [KILL] ${interaction.member.user.tag} used kill on ${member.tag}`);
	},
};