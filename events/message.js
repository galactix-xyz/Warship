const { MessageEmbed } = require('discord.js');
const { prefix } = require('../config.json');

module.exports = (client, message) => {
	if (!message.content.startsWith(prefix)) return;
	if (message.content.length <= 1) return;
	if (message.channel.type === 'dm') return; // * todo Remove later. Add can_dm to config.
	let messageArray = message.content.split(' ');
	let cmd = messageArray[0].toLowerCase();
	let args = messageArray.slice(1);

	let cf = client.commands.get(cmd.slice(prefix.length));
	let af = client.commands.get(client.aliases.get(cmd.slice(prefix.length)));
	if (cf) {
		cf.run(message, client, args);
	} else if (af) {
		af.run(message, client, args);
	}
};
