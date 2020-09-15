const {} = require('discord.js');
const ytdl = require('ytdl-core');
const { owner } = require('../config.json');

module.exports = {
	info: {
		name: 'reload',
		aliases: [ 'rel', 'rr', '!r' ],
		description: ''
	},
	run: async (message, bot, args) => {
		if (!message.author.id == owner.id) return message.channel.send('You are not authorised to use this command');

		if (args[0] == '' || args[0] === undefined || !args[0])
			return message.channel.send('Please specify what type of file you are reloading');
		if (args[1] == '' || args[1] === undefined || !args[1])
			return message.channel.send('Please specify a file to reload');

		if (args[0].toLowerCase() === 'command') {
			try {
				delete require.cache[require.resolve(`./${args[1]}.js`)];
				message.channel.send(`Successfully reloaded command: **${args[1]}**`);
			} catch (err) {
				return message.channel.send(`Failed to reload command: **${args[1]}**.\nError: \`\`\`${err}\`\`\``);
			}
		} else if (args[0].toLowerCase() === 'event') {
			try {
				delete require.cache[require.resolve(`../events/${args[1]}.js`)];
				message.channel.send(`Successfully reloaded event: **${args[1]}**`);
			} catch (err) {
				return message.channel.send(`Failed to reload event: **${args[1]}**.\nError: \`\`\`${err}\`\`\``);
			}
		}
	}
};
