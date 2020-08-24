const { Util, MessageEmbed } = require('discord.js');

module.exports = {
	info: {
		name: 'addrole',
		aliases: [ 'arole' ],
		description: ''
	},
	run: async (message, bot, args) => {
		message.delete();
		const perm_name = 'MANAGE_MESSAGES';

		if (!args[0] || args[0] == undefined || args[0] == '') {
			return message.channel.send('Please Specify a member and role');
		}
		let member = message.mentions.users.first();
		let member_add = message.guild.member(member);
		let role_name = args.splice(1).join(' ');

		if (!message.member.hasPermission(perm_name)) {
			let em = new MessageEmbed()
				.setColor('#ff0000')
				.setTitle('**Error**')
				.setDescription(
					`You don't have the correct permissions to use this command.\n\nPermission name: **${perm_name}**`
				);

			return message.channel.send(em).then((m) => m.delete({ timeout: 10000 }));
		}

		try {
			let em = 'hi';
			/*let em = new MessageEmbed()
				.setColor('#00ff00')
				.setTitle('**Added Role**')
				.setDescription(`Role: **${role_name}**\nAdded To: ${member_name}\nAdded By: ${message.author}`)
				.setTimestamp();*/

			let role = message.guild.roles.cache.find((r) => r.name.toLowerCase() === `${role_name.toLowerCase()}`);
			if (!role || role === undefined) return message.channel.send(`**${role_name}** not a valid role`);

			member_add.roles.add(role);

			message.guild.channels.cache.find((x) => x.name === 'modlogs').send(em);
			message.channel.send(`Successfull added role: ${role_name} to ${member_add}`);
		} catch (err) {}
	}
};
