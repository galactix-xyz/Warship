const { MessageEmbed } = require('discord.js');

module.exports = {
	info: {
		name: 'kick',
		aliases: [ 'k', 'm2', 'mod2' ],
		description: ''
	},
	run: async (message, bot, args) => {
		message.delete();
		const perm_name = 'KICK_MEMBERS';

		if (!message.member.hasPermission(perm_name)) {
			let em = new MessageEmbed()
				.setColor('#ff0000')
				.setTitle('**Error**')
				.setDescription(
					`You don't have the correct permissions to use this command.\n\nPermission name: **${perm_name}**`
				);

			return message.channel.send(em).then((m) => m.delete(10000));
		}
		let kickUser = message.mentions.users.first();
		let gmember = message.guild.member(kickUser);
		let reason = args.splice(1).join(' ');
		if (!kickUser) {
			let em = new MessageEmbed()
				.setColor('#ff0000')
				.setTitle('**Error**')
				.setDescription(
					`Please Mention a User To Kick\nFor Example: \`!kick @${message.author.tag} Not mentioning a user\``
				);

			return message.channel.send(em).then((m) => m.delete({ timeout: 10000 }));
		} else if (!reason || reason.length <= 0) {
			let em = new MessageEmbed()
				.setColor('#ff0000')
				.setTitle('**Error**')
				.setDescription(
					`Please specify a reason\nFor Example: \`!kick @${message.author
						.tag} Not having a reason to kick a user\``
				);

			return message.channel.send(em).then((m) => m.delete({ timeout: 10000 }));
		}

		if (!gmember.kickable) {
			let em = new MessageEmbed()
				.setColor('#ff0000')
				.setTitle('**Error**')
				.setDescription(`Unable to kick user, please try again`);

			console.log(error);

			return message.channel.send(em).then((m) => m.delete({ timeout: 10000 }));
		}

		try {
			let em = new MessageEmbed()
				.setColor('#ff9900')
				.setTitle('**Member kicked**')
				.setDescription(
					`Username: ${kickUser.tag}\nId: ${kickUser.id}\n\nKicked by: <@${message.author
						.id}>\nReason: \`${reason}\``
				)
				.setTimestamp();

			let em2 = new MessageEmbed()
				.setColor('#ff0000')
				.setTitle('**Kicked**')
				.setDescription(
					`You have been kicked from **${message.guild
						.name}**\n\nReason: \`${reason}\`\n\n\nYou can rejoin via this link: https://discord.gg/vabD3Fg`
				)
				.setTimestamp();

			message.guild.channels.cache.find((x) => x.name === 'modlogs').send(em);
			await kickUser.send(em2).catch();
			gmember.kick(reason);
		} catch (error) {
			let em = new MessageEmbed()
				.setColor('#ff0000')
				.setTitle('**Error**')
				.setDescription(`Unable to kick user, please try again`);

			console.log(error);

			return message.channel.send(em).then((m) => m.delete({ timeout: 10000 }));
		}
	}
};
