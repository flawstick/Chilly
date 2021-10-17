const { MessageEmbed } = require('discord.js');
const { bye, chat, byeGif } = require('../config.json')

// Return a MessageEmbed
function getEmbed(member) { 

    // Create removal message
    const greetEmbed = new MessageEmbed()
	    .setColor('#0099ff')
        .setDescription(`Goodbye, ${member.user}...`)
	    .setImage(byeGif)
	    .setTimestamp()
	    .setFooter(`Why'd you have to fuck off this way...`, member.avatar);
    
    return greetEmbed;
}
 
 module.exports = {

    // User leave event
    name: 'guildMemberRemove',
    execute(member) {
        console.log(`${member.user} has left the server...`);

        // Bye in bye channel
        member.guild.channels.cache.find(ch => ch.name === bye).send({ embeds: [getEmbed(member)] });

        // Bye in chat channel
        member.guild.channels.cache.find(ch => ch.name === chat).send({ embeds: [getEmbed(member)] });
    },
}