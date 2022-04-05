module.exports = {
	desc: 'See all commands',
	cat: 'Bot Info',
	run: function (self, msg) {
		let embed = new self.Discord.MessageEmbed()
			.setColor(0x39D5FF)
			.setTitle('Help')
			.setTimestamp();

		let categories = {};
		for (let cmd in self.commands) {
			let cmdData = self.commands[cmd];
			// TODO: Hide commands if user is not an admin
			// if (cmdData.restricted && self.isAdmin(msg.author.id)) {
			// continue;
			// }

			let category = cmdData.cat || 'Uncategorized';
			categories[category] = categories[category] || {};
			categories[category][cmd] = cmdData.desc + (cmdData.restricted && ' **[Admin only]**' || '') || 'No desc'
		}

		for (let category in categories) {
			let categoryStr = '';
			for (let cmd in categories[category]) {
				let desc = categories[category][cmd];
				categoryStr += cmd + ' - ' + (desc || 'No description') + '\n';
			}
			embed.addField(category, categoryStr);
		}

		msg.channel.send({ embed });
	},
};
