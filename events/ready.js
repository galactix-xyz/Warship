const { MessageEmbed, WebhookClient } = require('discord.js');

module.exports = (client) => {
	console.log('Bot started');

	client.user.setActivity('GALACTIX Software', { type: 'WATCHING' });

	let hook = new WebhookClient(
		'737256037081546865',
		'390QTLiBiaoDzpLUOdiK-H-FmDX1591vcGMFD03f39TusD5XH5h_shmFkvdDSrsudb7O'
	); // https://discordapp.com/api/webhooks/737256037081546865/390QTLiBiaoDzpLUOdiK-H-FmDX1591vcGMFD03f39TusD5XH5h_shmFkvdDSrsudb7O

	let em = new MessageEmbed().setColor('#00ff00').setTitle('**Bot Started**').setTimestamp();

	//hook.send(em);
};
