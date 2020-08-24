const { Client, MessageEmbed, Collection, WebhookClient } = require('discord.js');
const { readdirSync, readFileSync, readdir } = require('fs');
const { token, prefix, owner, apiKey } = require('./config.json');
const asciiTable = require('ascii-table');
const ytdl = require('ytdl-core');

const client = new Client();
client.commands = new Collection();
client.aliases = new Collection();
client.musicQueue = new Map();

client.once('ready', () => {
	console.log('Bot Started');
	client.user.setActivity('GALACTIX Software', { type: 'WATCHING' });

	let hook = new WebhookClient(
		'737256037081546865',
		'390QTLiBiaoDzpLUOdiK-H-FmDX1591vcGMFD03f39TusD5XH5h_shmFkvdDSrsudb7O'
	); // https://discordapp.com/api/webhooks/737256037081546865/390QTLiBiaoDzpLUOdiK-H-FmDX1591vcGMFD03f39TusD5XH5h_shmFkvdDSrsudb7O

	let em = new MessageEmbed().setColor('#00ff00').setTitle('**Bot Started**').setTimestamp();

	hook.send(em);
});

readdir('./commands/', (err, file) => {
	var table = new asciiTable('Commands').setHeading('Name', 'Status');
	if (err) console.log(err);

	let jsfile = file.filter((f) => f.split('.').pop() === 'js');
	if (jsfile.length <= 0) {
		console.log(`Couldn't get name of command: ${jsfile}`);
		return;
	}

	jsfile.forEach((f, i) => {
		let props = require(`./commands/${f}`);
		table.addRow(`${f}`, '✅');

		client.commands.set(props.info.name, props);
		if (props.info.aliases && Array.isArray(props.info.aliases)) {
			props.info.aliases.forEach((a) => client.aliases.set(a, props.info.name));
		}
	});

	console.log(table.toString());
});

client.on('message', (message) => {
	if (!message.content.startsWith(prefix)) return;
	if (message.content.length <= 1) return;
	let messageArray = message.content.split(' ');
	let cmd = messageArray[0].toLowerCase();
	let args = messageArray.slice(1);

	let cf = client.commands.get(cmd.slice(prefix.length));
	let af = client.commands.get(client.aliases.get(cmd.slice(prefix.length)));
	if (cf) {
		cf.run(message, client, args);
	} else if (af) {
		af.run(message, client, args);
	} else {
		let em = new MessageEmbed()
			.setColor('#ff9900')
			.setTitle('**Error**')
			.setDescription(`<@${message.author.id}> Invalid Command.`)
			.setFooter(`If this was a mistake, please contact <@${owner.id}>`);
		message.channel.send(em);
	}
});

client.on('guildMemberAdd', (member) => {
	let em = new MessageEmbed()
		.setColor('#00ff00')
		.setTitle('**Member Joined**')
		.setDescription(`User: ${member}\nID: ${member.user.id}`)
		.setThumbnail(member.user.avatarURL())
		.setTimestamp();

	member.guild.channels.cache.find((n) => n.name === 'join-leave').send(em).catch((err) => console.log(err));
	var role =
		member.guild.roles.cache.find((r) => r.name === 'Members') ||
		member.guild.roles.cache.find((r) => r.id === '733919226313703537');
	message.member.roles.add(role).catch((err) => console.log(err));
});

client.on('guildMemberRemove', (member) => {
	let em = new MessageEmbed()
		.setColor('#ff0000')
		.setTitle('**Member Left**')
		.setDescription(`User: ${member}\nID: ${member.user.id}`)
		.setThumbnail(member.user.avatarURL())
		.setTimestamp();

	member.guild.channels.cache.find((n) => n.name === 'join-leave').send(em);
});

client.login(token);

// ? Globals (also the first comment added to this project)
let play = function(guild, song, play_msg) {
	const serverQueue = client.musicQueue.get(guild.id);

	if (!song) {
		serverQueue.voiceChannel.leave();
		client.musicQueue.delete(guild.id);
		return;
	}

	const disp = serverQueue.connection
		.play(ytdl(song.url))
		.on('finish', () => {
			serverQueue.songs.shift();
			play(guild, serverQueue.songs[0], play_msg);
		})
		.on('error', (error) => {
			console.log(error);
		});
	disp.setVolumeLogarithmic(serverQueue.volume / 5);
	play_msg.channel.send(`Now Playing: **${song.title}**`);
};
module.exports = { play };
