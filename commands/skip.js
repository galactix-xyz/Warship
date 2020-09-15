const {} = require('discord.js');
const ytdl = require('ytdl-core');

module.exports = {
	info: {
		name: 'skip',
		aliases: [ 'skipsong' ],
		description: ''
	},
	run: async (message, bot, args) => {
		let voiceChannel = message.member.voice.channel;
		let serverQueue = bot.queue.get(message.guild.id);

		if (!serverQueue) return message.channel.send('Nothing is playing');
		serverQueue.connection.dispatcher.end();
	}
};
