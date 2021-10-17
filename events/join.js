 
 function getEmbed(member) { 

    // inside a command, event listener, etc.
    const greetEmbed = new MessageEmbed()
	    .setColor('#0099ff')
        .setDescription(`Welcome to C H I L L V E R S E, ${member.user}`)
	    .setImage('https://i.imgur.com/AfFp7pu.png')
	    .setTimestamp()
	    .setFooter('Have fun in our server!', member.avatar);
    
    return greetEmbed;
 }
 
 module.exports = {
     name: 'guildMemberAdd',
     on: true,
     execute(member) {
         member.guild.channels.get('『♡』・welc・').send({ embeds: [getEmbed(member)] });
     }
 }