const { Util, MessageEmbed } = require('discord.js');
const mysql = require('mysql');

let role_types = {
	['donator']: 'Donator',
	['donator+']: 'Donator+',
	['vip']: 'VIP',
	['vip+']: 'VIP+',
	['god']: 'God Tier',
	['mythical']: 'Mythical'
};

module.exports = {
	info: {
		name: 'redeem',
		aliases: [],
		description: ''
	},
	run: async (message, bot, args) => {
		message.delete();
		// if (message.guild.id != '733919226313703534')
		// 	return message.channel
		// 		.send('This command is not availible in this server.')
		// 		.then((m) => m.delete({ timeout: 5000 }));
		// ! MySQL Connection
		const connection = mysql.createConnection({
			host: '138.201.82.201',
			user: 'u275_hOIfi6Wvvo',
			password: 'j5xYXqOtNEsYymkKQMJdQixr',
			database: 's275_pi'
		});

		connection.connect(function(err) {
			if (err) throw err;
		});

		// ! Command
		let key = args[0].toString().toLowerCase();
		if (!key)
			return message.channel
				.send('Please supply a key with the format of xxxx-xxxx-xxxxx-xxxx')
				.then((m) => m.delete({ timeout: 5000 }));

		if (key) {
			connection.query(`SELECT * FROM product_keys WHERE product_key = '${key}'`, function(err, res) {
				if (err) throw err;
				if (res[0]) {
					if (res[0].product_key != '' || res[0].product_key != null || res[0].product_key != undefined) {
						if (res[0].redeemed === 1)
							return message.channel
								.send('Key has already been redeemed, please try again.')
								.then((m) => m.delete({ timeout: 5000 }));
						message.channel
							.send('Successfully redeemed product key')
							.then((m) => m.delete({ timeout: 5000 }));

						let rtype = role_types[res[0].type.toLowerCase()];

						let role = message.guild.roles.cache.find((r) => r.name === rtype);

						message.member.roles.add(role);
						connection.query(`UPDATE product_keys SET redeemed = '1' WHERE id = '${res[0].id}'`);
					}
				} else {
					message.channel
						.send('Invalid key. Please check your purchase email and try again')
						.then((m) => m.delete({ timeout: 5000 }));
				}
			});
		}
	}
};
