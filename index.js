// Require the necessary discord.js classes
const fs = require('fs');
const { Client, Intents, Collection } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { token, clientId, guildId } = require('./config.json');

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// Command collection (extends map)
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

// Initialize command collection
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}

// Load event files
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

// Iterate through events
for (const file of eventFiles) {

    // Get event by export
	const event = require(`./events/${file}`);

    // Check if once of on and run with ...args
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

// Register commands
client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

    // Get command by name
	const command = client.commands.get(interaction.commandName);
    if (!command) return;

    // Try to execute and return error message
    try {
        await command.execute(interaction);
    } catch (error) {
        console.error()
        await interaction.reply(`Couldn't execute ${interaction.commandName}`);
    }
});

// Login to Discord with your client's token
client.login(token);
