const { MessageEmbed } = require('discord.js');
const { readdirSync, readFileSync, readdir } = require('fs');

module.exports = {
	info: {
		name: 'help',
		aliases: [ 'cmd', 'cmds', '?' ],
		description: ''
	},
	run: async (message, bot, args) => {
		if (!args[0] || args[0].length <= 0) {
			readdir('./commands/', (err, file) => {
				let cmds = '';
				let jsfile = file.filter((f) => f.split('.').pop() === 'js');
				jsfile.forEach((f, i) => {
					let props = require(`./${f}`);
					let string = `**${props.info.name}**\n`;
					cmds += string;
				});

				let em = new MessageEmbed()
					.setColor('#0088ff')
					.setTitle('Commands List')
					.setDescription(cmds)
					.setTimestamp()
					.setThumbnail(bot.user.avatarURL());

				message.channel.send(em);
			});
		} else {
			readdir('./commands/', (err, file) => {
				let jsfile = file.filter((f) => f.split('.').pop() === 'js');
				jsfile.forEach((f, i) => {
					let props = require(`./${f}`);

					if (
						bot.commands.get(args[0].toLowerCase()) ||
						bot.commands.get(bot.alias.get(args.toLowerCase()))
					) {
						let cmd_info = 'e';
						let em = new MessageEmbed()
							.setColor('#0088ff')
							.setTitle(`Command Info for ${args[0]}`)
							.setDescription(cmd_info)
							.setTimestamp()
							.setThumbnail(bot.user.avatarURL());

						message.channel.send(em);
					}
				});
			});
		}
	}
};
