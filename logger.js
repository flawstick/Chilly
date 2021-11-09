const {
    Log
} = require('./utils/log.js');

module.exports.init = async function (client) {

    // channelCreate
    /* Emitted whenever a channel is created.
    PARAMETER    TYPE        DESCRIPTION
    channel      Channel     The channel that was created    */
    client.on("channelCreate", function (channel) {
        Log(`[INFO] [CHANNEL] [CREATE] Channel created: ${channel.name}`);
    });

    // channelDelete
    /* Emitted whenever a channel is deleted.
    PARAMETER   TYPE      DESCRIPTION
    channel     Channel   The channel that was deleted    */
    client.on("channelDelete", function (channel) {
        Log(`[INFO] [CHANNEL] [DELETE] Channel deleted: ${channel.name}`);
    });

    // channelPinsUpdate
    /* Emitted whenever the pins of a channel are updated. Due to the nature of the WebSocket event, not much information can be provided easily here 
    - you need to manually check the pins yourself.
    PARAMETER    TYPE         DESCRIPTION
    channel      Channel      The channel that the pins update occurred in
    time         Date         The time of the pins update    */
    client.on("channelPinsUpdate", function (channel, time) {
        Log(`[INFO] [CHANNEL] [PINS] ${channel.name} pins are updated! Time: ${time}`);
    });

    // channelUpdate
    /* Emitted whenever a channel is updated - e.g. name change, topic change.
    PARAMETER        TYPE        DESCRIPTION
    oldChannel       Channel     The channel before the update
    newChannel       Channel     The channel after the update    */
    client.on("channelUpdate", function (oldChannel, newChannel) {
        Log(`[INFO] [CHANNEL] [UPDATE] Name: ${oldChannel.name} : ${newChannel.name}. Topic: ${oldChannel.topic} : ${newChannel.topic}`);
    });

    // disconnect
    /* Emitted when the client's WebSocket disconnects and will no longer attempt to reconnect.
    PARAMETER    TYPE              DESCRIPTION
    Event        CloseEvent        The WebSocket close event    */
    client.on("disconnect", function (event) {
        Log(`[CLIENT] [DISCONNECT] ${client.name} Disconnected!`);
    });

    // emojiCreate
    /* Emitted whenever a custom emoji is created in a guild.
    PARAMETER    TYPE          DESCRIPTION
    emoji        Emoji         The emoji that was created    */
    client.on("emojiCreate", function (emoji) {
        Log(`[INFO] [EMOJI] [CREATE] Guild emoji created: ${emoji.toString()}`);
    });

    // emojiDelete
    /* Emitted whenever a custom guild emoji is deleted.
    PARAMETER    TYPE         DESCRIPTION
    emoji        Emoji        The emoji that was deleted    */
    client.on("emojiDelete", function (emoji) {
        Log(`[INFO] [EMOJI] [DELETE] Guild emoji deleted: ${emoji.toString()}`);
    });

    // emojiUpdate
    /* Emitted whenever a custom guild emoji is updated.
    PARAMETER    TYPE       DESCRIPTION
    oldEmoji     Emoji      The old emoji
    newEmoji     Emoji      The new emoji    */
    client.on("emojiUpdate", function (oldEmoji, newEmoji) {
        Log(`[INFO] [EMOJI] [UPDATE] Guild emoji updated!: ${newEmoji.toString()}`);
    });

    // guildBanAdd
    /* Emitted whenever a member is banned from a guild.
    PARAMETER    TYPE          DESCRIPTION
    guild        Guild         The guild that the ban occurred in
    user         User          The user that was banned    */
    client.on("guildBanAdd", function (guild, user) {
        Log(`[INFO] [BAN] ${user.tag} has been banned from the guild!`);
    });

    // guildBanRemove
    /* Emitted whenever a member is unbanned from a guild.
    PARAMETER    TYPE         DESCRIPTION
    guild        Guild        The guild that the unban occurred in
    user         User         The user that was unbanned    */
    client.on("guildBanRemove", function (guild, user) {
        Log(`[INFO] [UNBAN] ${user.tag} has been unbanned from the guild!`);
    });

    // guildMemberUpdate
    /* Emitted whenever a guild member changes - i.e. new role, removed role, nickname.
    PARAMETER    TYPE               DESCRIPTION
    oldMember    GuildMember        The member before the update
    newMember    GuildMember        The member after the update    */
    client.on("guildMemberUpdate", function (oldMember, newMember) {
        Log(`[INFO] [MEMBER] [UPDATE] ${newMember.user.tag}'s roles or nickname were updated!`);
    });

    // messageDelete
    /* Emitted whenever a message is deleted.
    PARAMETER      TYPE           DESCRIPTION
    message        Message        The deleted message    */
    client.on("messageDelete", function (message) {
        Log(`[INFO] [MESSAGE] [DELETE] ${message.id} was deleted from ${message.channel}`);
    });

    // messageDeleteBulk
    /* Emitted whenever messages are deleted in bulk.
    PARAMETER    TYPE                              DESCRIPTION
    messages     Collection<Snowflake, Message>    The deleted messages, mapped by their ID    */
    client.on("messageDeleteBulk", function (messages) {
        Log(`[INFO] [MESSAGE] [DELETE] a bulk of message was deleted`);
    });

    // messageUpdate
    /* Emitted whenever a message is updated - e.g. embed or content change.
    PARAMETER     TYPE           DESCRIPTION
    oldMessage    Message        The message before the update
    newMessage    Message        The message after the update    */
    client.on("messageUpdate", function (oldMessage, newMessage) {
        Log(`[INFO] [MESSAGE] [UPDATE] ${newMessage.id} was updated. Channel: ${newMessage.channel}`);
    });

    // roleCreate
    /* Emitted whenever a role is created.
    PARAMETER    TYPE        DESCRIPTION
    role         Role        The role that was created    */
    client.on("roleCreate", function (role) {
        Log(`[INFO] [ROLE] [CREATE] A role was created! Role: ${role.name}`);
    });

    // roleDelete
    /* Emitted whenever a guild role is deleted.
    PARAMETER    TYPE        DESCRIPTION
    role         Role        The role that was deleted    */
    client.on("roleDelete", function (role) {
        Log(`[INFO] [ROLE] [DELETE] A role was deleted! Role: ${role.name}`);
    });

    // roleUpdate
    /* Emitted whenever a guild role is updated.
    PARAMETER      TYPE        DESCRIPTION
    oldRole        Role        The role before the update
    newRole        Role        The role after the update    */
    client.on("roleUpdate", function (oldRole, newRole) {
        Log(`[INFO] [ROLE] [UPDATE] A role was updated! Role: ${oldRole.name} : ${newRole.name}`);
    });
}