module.exports = {
	cat: 'Color',
	desc: 'Cleans up all unused color roles. I hope.',
	run: function (_, msg) {
		let n = 0;

		msg.guild.roles.cache.forEach((role) => {
			if (role.name.startsWith('CColour - ') && role.members.size == 0) {
				n++;
				role.delete();
			}
		});

		if (n == 0) {
			return msg.channel.send('There are no unused roles.');
		}

		msg.channel.send(`Deleted ${n} role(s).`);
	},
};
