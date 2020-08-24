const { MessageEmbed } = require('discord.js');
const ytdl = require('ytdl-core');

module.exports = {
	info: {
		name: 'queue',
		aliases: [ 'np' ],
		description: ''
	},
	run: async (message, bot, args) => {
		let serverQueue = bot.musicQueue.get(message.guild.id);
		if (!serverQueue) return message.channel.send('Nothing is playing');

		let em = new MessageEmbed()
			.setColor('#0088ff')
			.setTitle(`**Currently Playing: ${serverQueue.songs[0].title}**`)
			.setDescription(`**Current Queue:**\n${serverQueue.songs.map((song) => `**-** ${song.title}`).join('\n')}`);

		message.channel.send(em);
	}
};
