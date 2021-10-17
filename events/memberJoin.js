const { MessageEmbed } = require('discord.js');
const { welcome, chat } = require('../config.json')

 function getEmbed(member) { 

    // inside a command, event listener, etc.
    const greetEmbed = new MessageEmbed()
	    .setColor('#0099ff')
        .setDescription(`Welcome to C H I L L V E R S E, ${member.user}`)
	    .setImage("https://media1.giphy.com/media/j0q2t5XWdbx6qgh0x6/giphy.gif?cid=790b7611310776113d06d29b39939904cfa568e9655d92d4&rid=giphy.gif&ct=g")
	    .setTimestamp()
	    .setFooter('Have fun in our server!', member.avatar);
    
    return greetEmbed;
 }
 
 module.exports = {
     name: 'guildMemberAdd',
     execute(member) {
         console.log(`${member.user} has joined the server!`);
         member.guild.channels.cache.find(ch => ch.name === welcome).send({ message: `Welcome to Chillverse, ${member.user}. Enjoy your stay!!`, embeds: [getEmbed(member)] });
         member.guild.channels.cache.find(ch => ch.name === chat).send({ embeds: [getEmbed(member)] });
     },
 }