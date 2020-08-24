const { MessageEmbed } = require('discord.js');
const { owner, prefix } = require('../config.json');

module.exports = {
	info: {
		name: 'prefix',
		aliases: [],
		description: ''
	},
	run: async (message, bot, args) => {
		message.delete();

		if (!message.member.user.id === owner.id) {
			let em = new MessageEmbed()
				.setColor('#ff0000')
				.setTitle('**Error**')
				.setDescription(`This command can only be run by the owner of the bot`);

			return message.channel.send(em).then((m) => m.delete({ timeout: 10000 }));
		}
		let newPrefix = args[0];

		prefix = newPrefix;
		let em = new MessageEmbed()
			.setColor('#00ff00')
			.setDescription(`Successfully changed prefix.\n\nNew Prefix: \`\`${newPrefix}\`\``);

		message.channel.send(em);
	}
};
