// Check if a message ecists in a json array
const checkMessageJsonArray = function (data, value) {
    for (let i = 0; i < data.length; i++)
        if (data[i].hasOwnProperty(value.toString()))
            return i;
    return false;
};

// Checks if an emoji exists withing a message json array object 
// Returns ( roleId | flase )
const checkEmojiJsonArray = function (data, emoji, index, messageId) {
    const array = data[index][messageId.toString()]; // Fetch array object

    // Loop through array object
    for (let i = 0; i < data.length; i++) 
        if (array[i].hasOwnProperty(emoji))
            return array[i][emoji.toString()];
    return false;
};

module.exports = {
    checkMessageJsonArray,
    checkEmojiJsonArray
}