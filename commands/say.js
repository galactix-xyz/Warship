const { MessageEmbed } = require('discord.js');

module.exports = {
	info: {
		name: 'say',
		aliases: [ 'sy' ],
		description: ''
	},
	run: async (message, bot, args) => {
		message.delete();
		const perm_name = 'ADMINISTRATOR';

		if (!message.member.hasPermission(perm_name)) {
			let em = new MessageEmbed()
				.setColor('#ff0000')
				.setTitle('**Error**')
				.setDescription(
					`You don't have the correct permissions to use this command.\n\nPermission name: **${perm_name}**`
				);

			return message.channel.send(em).then((m) => m.delete({ timeout: 10000 }));
		}
		let em = new MessageEmbed().setColor('#0088ff').setDescription(args.join(' '));

		message.channel.send(em);
	}
};
