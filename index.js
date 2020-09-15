const { Client, MessageEmbed, Collection, WebhookClient } = require('discord.js');
const { readdirSync, readFileSync, readdir } = require('fs');
const { token, prefix, owner } = require('./config.json');
const asciiTable = require('ascii-table');

const client = new Client();
client.commands = new Collection();
client.aliases = new Collection();
client.queue = new Collection();

readdir('./commands/', (err, file) => {
	var table = new asciiTable('Commands').setHeading('Name', 'Status');
	if (err) console.log(err);

	let jsfile = file.filter((f) => f.split('.').pop() === 'js');
	if (jsfile.length <= 0) {
		console.log(`Couldn't get name of command: ${jsfile}`);
		return;
	}

	jsfile.forEach((f, i) => {
		let props = require(`./commands/${f}`);
		table.addRow(`${f}`, '✅');

		client.commands.set(props.info.name, props);
		if (props.info.aliases && Array.isArray(props.info.aliases)) {
			props.info.aliases.forEach((a) => client.aliases.set(a, props.info.name));
		}
	});

	console.log(table.toString());
});

readdir('./events/', (err, files) => {
	if (err) console.log(err);

	files.forEach((f) => {
		if (!f.endsWith('.js')) return console.log('Invalid file found in events');

		let ef = require(`./events/${f}`);
		let en = f.split('.')[0];

		client.on(en, ef.bind(null, client));
	});
});

client.login(token);
module.exports = { client };
