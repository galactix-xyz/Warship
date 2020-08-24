const { MessageEmbed } = require('discord.js');

module.exports = {
	info: {
		name: 'prune',
		aliases: [ 'delete', 'purge' ],
		description: ''
	},
	run: async (message, bot, args) => {
		message.delete();
		const perm_name = 'MANAGE_MESSAGES';

		if (!message.member.hasPermission(perm_name)) {
			let em = new MessageEmbed()
				.setColor('#ff0000')
				.setTitle('**Error**')
				.setDescription(
					`You don't have the correct permissions to use this command.\n\nPermission name: **${perm_name}**`
				);

			return message.channel.send(em).then((m) => m.delete({ timeout: 10000 }));
		}

		if (!args[0] || args[0] <= 0 || args[0] > 100) {
			let em = new MessageEmbed()
				.setColor('#ff0000')
				.setTitle('**Error**')
				.setDescription(`Please specify an amount of messages to delete from 1-100`);

			return message.channel.send(em).then((m) => m.delete({ timeout: 10000 }));
		}

		try {
			let em = new MessageEmbed()
				.setColor('#0000ff')
				.setTitle('**Message Purge**')
				.setDescription(`Messages Deleted: \`\`${args[0]}\`\`\nDeleted By: ${message.author}`)
				.setTimestamp();

			message.channel.bulkDelete(args[0]);
			message.guild.channels.cache.find((x) => x.name === 'modlogs').send(em);
		} catch (err) {}
	}
};
