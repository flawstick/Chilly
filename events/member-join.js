const { MessageEmbed } = require('discord.js');
const { welcome, chat, welcomeGif } = require('../config.json')

// Return a MessageEmbed
function getEmbed(member) { 

    // Create welcome message
    const greetEmbed = new MessageEmbed()
	    .setColor('#0099ff')
        .setDescription(`Welcome to C H I L L V E R S E, ${member.user}`)
	    .setImage(welcomeGif)
	    .setTimestamp()
	    .setFooter('Have fun in our server!', member.avatar);
    
    return greetEmbed;
}
 
 module.exports = {

    // User join event
    name: 'guildMemberAdd',
    execute(member) {
        console.log(`${member.user} has joined the server!`);

        // Welcome in welcome channel
        member.guild.channels.cache.find(ch => ch.name === welcome).send({ embeds: [getEmbed(member)] });

        // Welcome in chat channel
        member.guild.channels.cache.find(ch => ch.name === chat).send({ embeds: [getEmbed(member)] });
    },
}