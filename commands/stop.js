const {} = require('discord.js');
const ytdl = require('ytdl-core');

module.exports = {
	info: {
		name: 'stop',
		aliases: [ 's' ],
		description: ''
	},
	run: async (message, bot, args) => {
		let voiceChannel = message.member.voice.channel;
		let serverQueue = bot.musicQueue.get(message.guild.id);

		if (!serverQueue) return message.channel.send('Nothing is playing');
		serverQueue.songs = [];
		serverQueue.connection.dispatcher.end();
		voiceChannel.leave();
	}
};
