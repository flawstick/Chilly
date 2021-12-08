const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { join } = require("path");

const { punch } = require(join(process.cwd() ,'/database/data/actions.json'));
const { Log } = require(join(process.cwd(), '/utils/log.js'));

module.exports = {
	data: new SlashCommandBuilder()
		.setName('punch')
		.setDescription('Punch a guild member')
        .addUserOption(option =>
            option.setName('member')
             .setDescription('User to punch')
             .setRequired(true)),

	async execute(interaction) {
		const member = interaction.options.getUser('member');

        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setDescription(`${interaction.member.user} knocked ${member}'s teeth out!`)
            .setImage(punch[(Math.round(Math.random()) * (punch.length - 1))])
            .setTimestamp();
            
        await interaction.reply({ embeds: [embed] });
        Log(`[INFO] [ACTION] [PUNCH] ${interaction.member.user.tag} used punch on ${member.tag}`);
	},
};