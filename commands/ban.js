const { MessageEmbed } = require('discord.js');

module.exports = {
	info: {
		name: 'ban',
		aliases: [ 'b', 'softban', 'hardban', 'mod3', 'm3' ],
		description: ''
	},
	run: async (message, bot, args) => {
		message.delete();
		const perm_name = 'BAN_MEMBERS';

		if (!message.member.hasPermission(perm_name)) {
			let em = new MessageEmbed()
				.setColor('#ff0000')
				.setTitle('**Error**')
				.setDescription(
					`You don't have the correct permissions to use this command.\n\nPermission name: **${perm_name}**`
				);

			return message.channel.send(em).then((m) => m.delete({ timeout: 10000 }));
		}
		let banUser = message.mentions.users.first();
		let gmember = message.guild.member(banUser);
		let reason = args.splice(1).join(' ');
		if (!banUser) {
			let em = new MessageEmbed()
				.setColor('#ff0000')
				.setTitle('**Error**')
				.setDescription(
					`Please Mention a User To ban\nFor Example: \`!ban @${message.author.tag} Not mentioning a user\``
				);

			return message.channel.send(em).then((m) => m.delete({ timeout: 10000 }));
		} else if (!reason || reason.length <= 0) {
			let em = new MessageEmbed()
				.setColor('#ff0000')
				.setTitle('**Error**')
				.setDescription(
					`Please specify a reason\nFor Example: \`!ban @${message.author
						.tag} Not having a reason to ban a ban\``
				);

			return message.channel.send(em).then((m) => m.delete({ timeout: 10000 }));
		}

		if (!gmember.bannable) {
			let em = new MessageEmbed()
				.setColor('#ff0000')
				.setTitle('**Error**')
				.setDescription(`Unable to ban user, please try again`);

			console.log(error);

			return message.channel.send(em).then((m) => m.delete({ timeout: 10000 }));
		}

		try {
			let em = new MessageEmbed()
				.setColor('#ff0000')
				.setTitle('**Member banned**')
				.setDescription(
					`Username: ${banUser.tag}\nId: ${banUser.id}\n\nBanned by: <@${message.author
						.id}>\nReason: \`${reason}\``
				)
				.setTimestamp();

			let em2 = new MessageEmbed()
				.setColor('#ff0000')
				.setTitle('**Banned**')
				.setDescription(`You have been banned from **${message.guild.name}**\n\nReason: \`${reason}\``)
				.setTimestamp();

			message.guild.channels.cache.find((x) => x.name === 'modlogs').send(em);
			await banUser.send(em2).catch();
			gmember.ban(reason);
		} catch (error) {
			let em = new MessageEmbed()
				.setColor('#ff0000')
				.setTitle('**Error**')
				.setDescription(`Unable to ban user, please try again`);

			console.log(error);

			return message.channel.send(em).then((m) => m.delete({ timeout: 10000 }));
		}
	}
};
