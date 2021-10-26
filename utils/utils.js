const checkValueJsonArray = async function(array, value) {
    for (let i = 0; i < array.length; i++)
        if (array[i] === value)
            return i;
    return false;
} 

module.exports = {
    checkValueJsonArray
}