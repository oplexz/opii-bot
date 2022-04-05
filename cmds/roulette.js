module.exports = {
	desc: 'Roulette (Jinxei special)',
	cat: 'Misc',
	run: function (_opii, msg) {
		const outcome = Math.random();
		const tag = `<@${msg.author.id}>`;
		if (outcome < 0.05) {
			msg.channel.send(`Missed ${tag} due to resolver`);
		} else if (outcome < 0.10) {
			msg.channel.send(`Missed ${tag} due to occlusion`);
		} else if (outcome < 0.70) {
			msg.channel.send(`Missed ${tag} due to spread`);
		} else {
			msg.channel.send(`1tap ${tag}`);
		}
	},
};
