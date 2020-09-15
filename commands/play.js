const { MessageEmbed, Util } = require('discord.js');
const { owner, apiKey } = require('../config.json');
const ytdl = require('ytdl-core');
const YouTube = require('simple-youtube-api');
const globals = require('../global/globals.js');
const { play } = require('../global/globals.js');

let youtube = new YouTube(apiKey);

module.exports = {
	info: {
		name: 'play',
		aliases: [ 'p' ],
		description: ''
	},
	run: async (message, bot, args) => {
		let guildQueue = bot.queue.get(message.guild.id);
		message.delete();

		let voice = message.member.voice.channel;
		if (!voice) return message.channel.send('You must be in a voice channel to use this command');

		let search_string = args.slice(0).join(' ');
		let url = args[0] ? args[0].replace(/<(._)>/g, '$1') : '';

		try {
			let video = await youtube.getVideoByID(url);
		} catch (e) {
			try {
				var videos = await youtube.searchVideos(search_string, 1);
				var video = await youtube.getVideoByID(videos[0].id);
			} catch (e) {
				return message.channel.send(`Unable to find video: **${search_string}**`);
			}
		}

		let song = {
			id: video.id,
			title: Util.escapeMarkdown(video.title),
			url: `https://www.youtube.com/watch?v=${video.id}`,
			duration: video.durationSeconds
		};

		if (!guildQueue) {
			let queueConst = {
				connection: null,
				songs: [],
				volume: 0.5,
				playing: true,
				dispatcher: null,
				video: null
			};

			bot.queue.set(message.guild.id, queueConst);
			queueConst.songs.push(song);

			try {
				var connection = await voice.join();
				queueConst.connection = connection;

				globals.play(url, queueConst.songs[0], voice, message, video);
			} catch (e) {
				bot.queue.delete(message.guild.id);
				console.log(e);
				return message.channel.send(`Failed to add song: **${song.title}** to queue`);
			}
		} else {
			guildQueue.songs.push(song);
			return message.channel.send(`**${song.title}** Has been added to the queue`);
		}
	}
};
