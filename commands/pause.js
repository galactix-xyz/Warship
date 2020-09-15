const { MessageEmbed } = require('discord.js');
const ytdl = require('ytdl-core');

module.exports = {
	info: {
		name: 'pause',
		aliases: [],
		description: ''
	},
	run: async (message, bot, args) => {
		let serverQueue = bot.queue.get(message.guild.id);

		if (!serverQueue) return message.channel.send('Nothing is playing');
		if (!serverQueue.playing) return message.channel.send('Already paused');

		serverQueue.playing = false;
		serverQueue.connection.dispatcher.pause();
		message.channel.send('Music is now paused');
	}
};
