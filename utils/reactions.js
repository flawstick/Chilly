const {
    client
} = require('../index.js');

// Check if a message ecists in a json array
const checkMessageJsonArray = function (data, value) {
    for (let i = 0; i < data.length; i++)
        if (data[i].hasOwnProperty(value.toString()))
            return i;
    return false;
};

// Checks if an emoji exists withing a message json array object 
// Returns ( roleId | flase )
const getEmojiJsonArray = function (data, emoji, index, messageId) {
    const array = data[index][messageId.toString()]; // Fetch array object

    // Loop through array object
    for (let i = 0; i < array.length; i++)
        if (array[i].hasOwnProperty(emoji))
            return array[i][emoji.toString()];
    return false;
};

// Checks if an emoji exists withing a message json array object 
// Returns ( index | flase )
const checkEmojiJsonArray = function (data, emoji, index, messageId) {
    const array = data[index][messageId.toString()]; // Fetch array object

    // Loop through array object
    for (let i = 0; i < array.length; i++)
        if (array[i].hasOwnProperty(emoji))
            return i;
    return false;
};

// Ckeck if a member exceeded the max limit in one of the messages
// Returns ( true | flase )
const checkLegalReaction = function (message, user, max) {

    /*Huge issue here, data needs to be cached in order to operate with it
    there are some guides on caching online too tired rn tho lmao*/
    message.reactions.cache.filter(reaction => reaction.users.cache.has(user.id)).size <= max;
}

module.exports = {
    checkMessageJsonArray,
    checkEmojiJsonArray,
    getEmojiJsonArray,
    checkLegalReaction
}