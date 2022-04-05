// TODO: Fix (old color gets removed, but new one doesn't get assigned)

const colorutils = require('../colorutils.js');

module.exports = {
	cat: 'Color',
	desc: 'Set your color!',
	run: function (opii, msg, args) {
		if (!msg.guild.member(opii.client.user.id).hasPermission('MANAGE_ROLES')) {
			return msg.channel.send('I don\'t have ``Manage Roles`` permission! :<');
		}

		let color = args[0];

		if (!colorutils.isColor(color)) {
			return msg.channel.send('Invalid HEX color.\nExamples of valid colors: `#f4d` `e36` `#7ea2c4` `ec472b`');
		}

		let target = args[1] && (msg.mentions.users.first() || msg.guild.member(args[1]).user);

		if (target) {
			if (opii.isAdmin(msg.author.id)) {
				let oldColor = colorutils.getUserColor(msg, target);
				(async () => {
					await colorutils.giveColor(msg, msg.guild.member(target.id), colorutils.formatColor(color));
					msg.channel.send(`${target.username}'s color was changed to \`\`${colorutils.formatColor(color)}\`\`. (Old color: \`\`${oldColor}\`\`)`);
				})();
			}
			else {
				return msg.channel.send('Nuh-uh, you can\'t do that :^)');
			}
		}
		else {
			let oldColor = colorutils.getUserColor(msg, msg.author);
			(async () => {
				await colorutils.giveColor(msg, msg.guild.member(msg.author.id), colorutils.formatColor(color));
				msg.channel.send(`:ok_hand: (Old color: \`\`${oldColor}\`\`, New color: \`\`${colorutils.formatColor(color)}\`\`)`);
			})();
		}
	},
};
