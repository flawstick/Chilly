 module.exports = {
     name: 'guildMemberAdd',
     on: true,
     execute(member) {
         member.guild.channels.get('chat').sendMessage(`Welcome ${member.user}`);
     }
 }