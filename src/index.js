// Require the necessary discord.js classes
const fs = require('fs');
const {
	Client,
	Intents,
	Collection,
	Options
} = require('discord.js');
const {
	REST
} = require('@discordjs/rest');
const {
	token,
	clientId,
	guildId,
} = require('../config.json');
const {
	Routes
} = require('discord-api-types/v9');

// Create a new client instance
const client = new Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS,
		Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
		Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.DIRECT_MESSAGE_REACTIONS, Intents.FLAGS.DIRECT_MESSAGE_TYPING,
		Intents.FLAGS.GUILD_BANS, Intents.FLAGS.GUILD_INTEGRATIONS, Intents.FLAGS.GUILD_INVITES, Intents.FLAGS.GUILD_VOICE_STATES,
		Intents.FLAGS.GUILD_MESSAGE_TYPING, Intents.FLAGS.GUILD_WEBHOOKS
	],
	partials: ['MESSAGE', 'REACTION', 'GUILD_MEMBER', 'USER'],
	makeCache: Options.cacheEverything()
});

// Export client for the motherland
module.exports = {
	client
}

//--------------------------------------------------------------------------------------

// Command collection (extends map)
client.commands = new Collection();
var commandFiles = fs.readdirSync('src/commands').filter(file => file.endsWith('.js'));

// Array of commands for JSON
var commands = [];

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

//----------------------------------------------------------------------------------------

// Make collection for reaction roles commands
client.reactions = new Collection();

// Read reaction role command files
commandFiles = fs.readdirSync('src/commands/reactions').filter(file => file.endsWith('.js'));

// Initialize command collection
for (const file of commandFiles) {
	const command = require(`./commands/reactions/${file}`);

	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.reactions.set(command.data.name, command);

	// Add everything into a
	// Json file to reload commands
	commands.push(command.data.toJSON());
}

//----------------------------------------------------------------------------------------

// Make collection for verifacation command
client.action = new Collection();

// Read reaction role command files
commandFiles = fs.readdirSync('src/commands/actions').filter(file => file.endsWith('.js'));

// Initialize command collection
for (const file of commandFiles) {
	const command = require(`./commands/actions/${file}`);

	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.action.set(command.data.name, command);

	// Add everything into a
	// Json file to reload commands
	commands.push(command.data.toJSON());
}

//----------------------------------------------------------------------------------------

// Rest disocrd API	
const rest = new REST({
	version: '9'
}).setToken(token);

// Asynchronously reload slash commands
(async () => {
	try {
		// Start reload
		console.log('[INFO] [COMMANDS] Reloading Slash Commands');
		await rest.put(
			Routes.applicationGuildCommands(clientId, guildId), {
				body: commands
			}
		);

		// End reload
		console.log('[INFO] [COMMANDS] Finished reloading Slash Commands');
	} catch (error) {
		console.log('[ERROR] [COMMANDS] Failed to reload Slash Commands Error: ' + error);
	}
})();

//===========================================================================================

// Register commands
client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	// Get command by name
	const command = client.commands.get(interaction.commandName);
	if (!command) return;

	// Try to execute 
	await command.execute(interaction);
});

//-------------------------------------------------------------------------------------------

// Register actions commands
client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	// Get command by name
	const command = client.action.get(interaction.commandName);
	if (!command) return; // return if the command is null

	// Try to execute 
	await command.execute(interaction);
});

//-------------------------------------------------------------------------------------------

// Regiset reaction-roles commands
client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	// Get command by name
	const command = client.reactions.get(interaction.commandName);
	if (!command) return; // return if the command isn't there

	// Try to execute 
	await command.execute(interaction);
});

//============================================================================================

// Load event files	
var eventFiles = fs.readdirSync('src/events').filter(file => file.endsWith('.js'));

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

	// Log registration
	console.log(`[INFO] [EVENT] Registered: ${event.name}`);
}

//-----------------------------------------------------------------------------------------------

eventFiles = fs.readdirSync('src/events/reactions').filter(file => file.endsWith('js'));

// Iterate through events
for (const file of eventFiles) {

	// Get event by export
	const event = require(`./events/reactions/${file}`);

	// Check if once of on and run with ...args
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}

	// Log registration
	console.log(`[INFO] [EVENT] Registered: ${event.name}`);
}

// Free used memory
eventFiles = undefined;

//=================================================================================================
//=================================================
// Login to Discord with your client's token	//=================================================
client.login(token); //=================================================	
//=================================================
//==================================================================================================