const { MessageEmbed, Util } = require('discord.js');
const { owner } = require('../config.json');
const createBar = require('string-progressbar');

module.exports = {
	info: {
		name: 'queue',
		aliases: [ 'q', 'np' ],
		description: ''
	},
	run: async (message, bot, args) => {
		let queue = bot.queue.get(message.guild.id);
		let songQueue = '**-** Nothing enqueued';
		let cplaying = 'Nothing Playing';

		if (!queue)
			return message.channel.send(
				'Nothing is playing. Please do ``!play <song name || song url>`` and try again'
			);

		if (!queue.songs.length <= 0 || !queue.songs.map((song) => song.title).slice(1).length <= 0)
			songQueue = '**' + queue.songs.map((song) => song.title).slice(1).join('\n\n') + '**';
		if (queue.songs[0].title && !queue.songs[0].title == '') songQueue = queue.songs[0].title;

		let em = new MessageEmbed()
			.setColor('#0055ff')
			.setTitle(`Currently Playing: **${cplaying}**`)
			.setTimestamp()
			.setDescription(`Current Queue:\n${songQueue}`);

		message.channel.send(em);
	}
};
