// Require the necessary discord.js classes
const fs = require('fs');
const { Client, Intents, Collection } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { token, clientId, guildId, verify } = require('./config.json');
const { Routes } = require('discord-api-types/v9');
const { freemem } = require('os');

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS] });

// Command collection (extends map)
client.commands = new Collection();
commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

// Array of commands for JSON
const commands = [];

// Initialize command collection
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);

	// Add everything into a
	// Json file to reload commands
	commands.push(command.data.toJSON());
}

// Make collection for verifacation command
client.verify = new Collection();

// Get verify file
const command = require(`./verify/verify.js`);
	
// Set a new item in the Collection
// With the key as the command name and the value as the exported module
client.verify.set(command.data.name, command);

// Add everything into a
// Json format to reload commands
commands.push(command.data.toJSON());


// Rest disocrd API	
const rest = new REST({version: '9'}).setToken(token);

// Asynchronously reload slash commands
(async () => {
	try {
		// Start reload
		console.log('Reloading Slash Commands');
		await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands }
			);
		
		// End reload
		console.log('Finished reloading Slash Commands');
	} catch (error) {
		console.log('Failed to reload Slash Commands');
	}
})();

// Free used memory
freemem(commands);
freemem(commandFiles);

// Register commands
client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;
	if (interaction.channel.name === verify) return;

    // Get command by name
	const command = client.commands.get(interaction.commandName);
    if (!command) return;

    // Try to execute 
    await command.execute(interaction);
});

// Register verify commands
client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	// Return if the interactiopn isnt in the command seciton
	if (interaction.channel.name !== verify) return;

    // Get command by name
	const command = client.verify.get(interaction.commandName);
    if (!command) return; // return if the command isn't verify

    // Try to execute 
    await command.execute(interaction);
});

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

	console.log(`registered ${event.name}`);
}

// Free used memory
freemem(eventFiles)


// Login to Discord with your client's token
client.login(token);
