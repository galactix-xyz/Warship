const { Util } = require('discord.js');
const { apiKey } = require('../config.json');
const ytdl = require('ytdl-core');
const { play } = require('../index.js');
const YouTube = require('simple-youtube-api');
const youtube = new YouTube(apiKey);

module.exports = {
	info: {
		name: 'volume',
		aliases: [ 'vol', 'v' ],
		description: ''
	},
	run: async (message, bot, args) => {
		let serverQueue = await bot.musicQueue.get(message.guild.id);

		if (!serverQueue.volume) return message.channel.send('Nothing is playing so i cannot change the volume');

		if (!args[0] || args[0].length <= 0)
			return message.channel.send(`The Current Volume Is: **${serverQueue.volume}**`);

		if (isNaN(args[0])) return message.channel.send('Invalid Volume');
		serverQueue.volume = args[0];
		serverQueue.connection.dispatcher.setVolumeLogarithmic(args[0] / 5);
		message.channel.send(`Volume set to: **${args[0]}**`);
	}
};
