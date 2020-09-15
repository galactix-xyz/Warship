const { MessageEmbed } = require('discord.js');
const { owner } = require('../config.json');

module.exports = {
	info: {
		name: 'emit',
		aliases: [],
		description: ''
	},
	run: async (message, bot, args) => {
		message.delete();
		if (!message.author.id === owner.id)
			return message.channel.send('You do not have permission to use this command');

		if (!args[0] || args[0] == '') return message.channel.send('Please supply an event to emit');
		bot.emit(args[0], message.member);
	}
};
