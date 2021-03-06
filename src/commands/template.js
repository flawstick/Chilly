const {
    SlashCommandBuilder
} = require("@discordjs/builders");
const {
    MessageEmbed
} = require("discord.js");

const {
    intro,
    welcomeGif
} = require('../../config.json');
const {
    Log
} = require("../utils/log");

module.exports = {

    data: new SlashCommandBuilder()
        .setName('template')
        .setDescription('Get template of introduction!'),

    async execute(interaction) {
        if (interaction.channel.id != intro)
            return;

        var channel = await interaction.member.createDM();
        await channel.send(`
        Hello ${interaction.member.user}, Chilly will now await your messages to create your template!
Please comply accordingly. If you wish to cancel this template please write /cancel.
***If your template is inappropriate you will be either kicked, banned or warned!***

We will now begin your template, enter your name: 
        `);

        interaction.reply({
            content: 'A message has been sent to your dms!',
            ephemeral: true
        });
        Log(`[INFO] [TEMAPLTE]`, `${interaction.member.user.tag} has started building a template!`);

        const collected = new Map();
        try {
            // Fetch name
            collected.set('name', await channel.awaitMessages({
                max: 1,
                time: 60000 * 5,
                errors: ['time']
            }));
            if (collected.get('name') === `cancel`)
                return;

            // Fetch sexuality
            await channel.send(`Enter your sexuality: `);
            collected.set('sexuality', await channel.awaitMessages({
                max: 1,
                time: 60000 * 5,
                errors: ['time']
            }));
            if (collected.get('sexuality') === `cancel`)
                return;

            // Fetch pronouns
            await channel.send(`Enter your pronouns: `);
            collected.set('pronouns', await channel.awaitMessages({
                max: 1,
                time: 60000 * 5,
                errors: ['time']
            }));
            if (collected.get(collected.pronouns) === `cancel`)
                return;

            // Fetch age
            await channel.send(`Enter your age: `);
            collected.set('age', await channel.awaitMessages({
                max: 1,
                time: 60000 * 5,
                errors: ['time']
            }));
            if (collected.get('age') === `cancel`)
                return;

            // Fetch birthday
            await channel.send(`Enter your birthday: `);
            collected.set('birthday', await channel.awaitMessages({
                max: 1,
                time: 60000 * 5,
                errors: ['time']
            }));
            if (collected.get('birthday') === `cancel`)
                return;

            // Fetch hobbies
            await channel.send(`Enter your hobbies: (one message)`);
            collected.set('hobbies', await channel.awaitMessages({
                max: 1,
                time: 60000 * 5,
                errors: ['time']
            }));
            if (collected.get('hobbies') === `cancel`)
                return;

            // Fetch fun facts
            await channel.send(`Enter fun facts about yourself: (one message)`);
            collected.set('fun facts', await channel.awaitMessages({
                max: 1,
                time: 60000 * 5,
                errors: ['time']
            }));
            if (collected.get('fun facts') === `cancel`)
                return;

        } catch (error) {
            Log(`[ERROR] [TEMPLATE] [TIMEOUT]`, `${interaction.member.user.tag}'s template build has timed out!`);
            return;
        }

        // Create embed template
        const embed = new MessageEmbed()
            .setColor('#7718b7')
            .setTitle(interaction.member.user.username)
            .setAuthor(interaction.member.user.username, interaction.member.user.avatarURL())
            .setDescription(`
????????? ??? ?????????: .??? . :??????. ????????? 
**Name**: <a:cute_hearts:907785098005446687>
${collected.get('name').last()}

**Sexuality:** <a:cute_hearts:907785098005446687>
${collected.get('sexuality').last()} 

**Pronouns:** <a:cute_hearts:907785098005446687>
${collected.get('pronouns').last()}
                
**age:** <a:cute_hearts:907785098005446687>
${collected.get('age').last()}

**birthday:** <a:cute_hearts:907785098005446687>
${collected.get('birthday').last()}

**hobbies:** <a:cute_hearts:907785098005446687>
${collected.get('hobbies').last()}

**fun facts:** <a:cute_hearts:907785098005446687>
${collected.get('fun facts').last()}
????????? ??? ?????????: .??? . :??????. ????????? 
            `)
            .setThumbnail(welcomeGif[(Math.round(Math.random()) * (welcomeGif.length - 1))])
            .setImage(interaction.member.user.avatarURL())
            .setTimestamp()
            .setFooter('You can also send your own introduction! use /template!', interaction.guild.iconURL())

        await channel.send({
            embeds: [embed]
        });
        interaction.channel.send({
            embeds: [embed]
        });

        channel = undefined; // Close dms, prevent memory leak.
    },
}