const { Util } = require('discord.js');
const { apiKey } = require('../config.json');
const ytdl = require('ytdl-core');
const { play } = require('../index.js');
const YouTube = require('simple-youtube-api');
const youtube = new YouTube(apiKey);

module.exports = {
	info: {
		name: 'play',
		aliases: [ 'p', 'sr', 'song', 'enqueue', 'resume' ],
		description: ''
	},
	run: async (message, bot, args) => {
		let voiceChannel = message.member.voice.channel;
		let serverQueue = bot.musicQueue.get(message.guild.id);
		if (!args[0] || args[0].length <= 0 || args[0] === '') return resume(serverQueue, message, args);

		let search_string = args.slice(0).join(' ');
		let url = args[0] ? args[0].replace(/<(._)>/g, '$1') : '';

		if (voiceChannel || !voiceChannel === undefined) {
			try {
				var video = await youtube.getVideoByID(url);
			} catch (e) {
				try {
					var videos = await youtube.searchVideos(search_string, 1);
					var video = await youtube.getVideoByID(videos[0].id);
				} catch (e) {
					return message.channel.send('Unable to find video');
				}
			}

			let song = {
				id: video.id,
				title: Util.escapeMarkdown(video.title),
				url: `https://www.youtube.com/watch?v=${video.id}`
			};

			if (!serverQueue) {
				let queueConstruct = {
					textChannel: message.channel,
					voiceChannel: voiceChannel,
					connection: null,
					songs: [],
					volume: 5,
					playing: true
				};

				bot.musicQueue.set(message.guild.id, queueConstruct);
				queueConstruct.songs.push(song);

				try {
					var connection = await voiceChannel.join();
					queueConstruct.connection = connection;
					play(message.guild, queueConstruct.songs[0], message);
					console.log(song.title);
					console.log(`${search_string}\n${url}`);
				} catch (e) {
					console.log(e);
					bot.musicQueue.delete;
					return message.channel.send('Failed to add song to queue');
				}
			} else {
				serverQueue.songs.push(song);
				return message.channel.send(`${song.title} has been added to the queue`);
			}
		}
	}
};

function resume(serverQueue, message, args) {
	if (!serverQueue) return message.channel.send('Nothing is playing');
	if (serverQueue.playing) return message.channel.send('Music is not paused');
	serverQueue.playing = true;
	serverQueue.connection.dispatcher.resume();
	message.channel.send('Music has been resumed');
	console.log(args[0]);
}
