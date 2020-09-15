const ytdl = require('ytdl-core');
const { Message } = require('discord.js');
const { client } = require('../index.js');
const YouTube = require('simple-youtube-api');
const { owner, apiKey } = require('../config.json');

let youtube = new YouTube(apiKey);

let play = async function(url, song, voice, message) {
	let guildQueue = client.queue.get(message.guild.id);

	if (!song) {
		voice.leave();
		client.queue.delete(message.guild.id);
		return;
	}

	let dispatcher = await guildQueue.connection
		.play(ytdl(song.url))
		.on('finish', async () => {
			guildQueue.songs.shift();
			play(url, guildQueue.songs[0], voice, message);
		})
		.on('error', (error) => {
			message.channel.send(error);
		});

	dispatcher.setVolume(guildQueue.volume);
	guildQueue.dispatcher = dispatcher;
	message.channel.send(`Now playing: **${song.title}**`);
};

module.exports = { play };
