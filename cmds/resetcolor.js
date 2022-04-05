const colorutils = require('../colorutils.js');

module.exports = {
	cat: 'Color',
	desc: 'Reset your color!',
	run: async function (opii, msg, args) {
		if (!msg.guild.member(opii.client.user.id).hasPermission('MANAGE_ROLES')) {
			return msg.channel.send('I don\'t have ``Manage Roles`` permission! :<');
		}

		let target = args[0] && (msg.mentions.users.first() || msg.guild.member(args[0]).user);

		if (target) {
			if (opii.isAdmin(msg.author.id)) {
				let oldColor = colorutils.getUserColor(msg, target);
				(async () => {
					await colorutils.takeColor(msg, target);
					return msg.channel.send(`${target.username}'s color was reset. (was \`\`${colorutils.formatColor(oldColor)}\`\`)`);
				})();
			}
		}
		else {
			let oldColor = colorutils.getUserColor(msg, msg.author);
			(async () => {
				await colorutils.takeColor(msg, msg.author);
				msg.channel.send(`Your color was reset. (was \`\`${colorutils.formatColor(oldColor)}\`\`)`);
			})();
		}
	},
};
