const { MessageEmbed, MessageAttachment } = require('discord.js');
const date = require('date');
const Canvas = require('canvas');
const message = require('./message');
let todays_date = new Date();
let current_year = todays_date.getFullYear();

const applyText = (canvas, text) => {
	const ctx = canvas.getContext('2d');

	// Declare a base size of the font
	let fontSize = 60;

	do {
		// Assign the font to the context and decrement it so it can be measured again
		ctx.font = `${(fontSize -= 10)}px sans-serif`;
		// Compare pixel width of the text to the canvas minus the approximate avatar size
	} while (ctx.measureText(text).width > canvas.width - 300);

	// Return the result to use in the actual canvas
	return ctx.font;
};

module.exports = async (client, member) => {
	const channel = member.guild.channels.cache.find((c) => c.name === 'join-leave');
	const role = member.guild.roles.cache.find((r) => r.name === 'Members' || r.id === '733919226313703537');
	if (!channel) return;

	const canvas = Canvas.createCanvas(700, 250);
	const ctx = canvas.getContext('2d');

	const background = await Canvas.loadImage('./bg.jpg');
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

	ctx.strokeStyle = '#ffffff00';
	ctx.strokeRect(0, 0, canvas.width, canvas.height);

	// Slightly smaller text placed above the member's display name
	ctx.font = '28px sans-serif';
	ctx.fillStyle = '#ffffff';
	ctx.fillText('Member Joined', canvas.width / 2.5, canvas.height / 3.5);

	// Add an exclamation point here and below
	ctx.font = applyText(canvas, `${member.user.tag}`);
	ctx.fillStyle = '#ffffff';
	ctx.fillText(`${member.displayName}`, canvas.width / 2.5, canvas.height / 1.8);

	ctx.font = '15px sans-serif';
	ctx.fillStyle = '#ffffff';
	ctx.fillText(`#${member.user.discriminator}`, canvas.width / 2.5, canvas.height / 1.6);

	ctx.beginPath();
	ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.clip();

	const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
	ctx.drawImage(avatar, 25, 25, 200, 200);

	const attachment = new MessageAttachment(canvas.toBuffer(), 'welcome-image.png');

	let embed = new MessageEmbed()
		.setTitle('__**Member Joined**__')
		.addField(`**User:**`, member, false)
		.addField(`**Id:**`, member.user.id, false)
		.setImage('attachment://welcome-image.png')
		.setColor('#00ff00')
		.setTimestamp()
		.setFooter(`© GALACTIX Software ${current_year}`, client.user.avatarURL())
		.attachFiles(attachment);

	channel.send(embed).catch((e) => console.log(e));
	member.roles.add();
};
