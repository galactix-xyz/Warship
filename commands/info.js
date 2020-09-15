const { MessageEmbed, ReactionCollector } = require('discord.js');

module.exports = {
	info: {
		name: 'info',
		aliases: [ 'company' ],
		description: ''
	},
	run: async (message, bot, args) => {
		message.delete();

		let em = new MessageEmbed()
			.setTitle('**Company Info**')
			.setTimestamp()
			.setColor('#fffffe')
			.setDescription('GALACTIX Software')
			.setThumbnail(
				'https://cdn.discordapp.com/attachments/736277721285394443/752202055405535342/PersonalLogo.png'
			);

		message.channel
			.send(em)
			.then((m) => {
				m.react('✅');
				const filter = (reaction, user) => {
					return reaction.emoji.name === '✅' && user.id === message.author.id;
				};

				m
					.awaitReactions(filter, { max: 1, time: 10000, errors: [ 'time' ] })
					.then((collected) => m.delete())
					.catch((collected) => {
						m.delete();
					});
			})
			.catch();
	}
};
