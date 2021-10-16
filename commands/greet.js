const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    
    data: new SlashCommandBuilder()
    .setName('greet')
    .setDescription('say hi to a player')
    .addStringOption(option => 
        option.setName('user')
            .setDescription('user you want to greet')
            .setRequired(true)),
    
    async execute(interaction) {
        const user = interaction.options.getString('user');

        await interaction.reply(`Hello ${user}!`);
    },
}