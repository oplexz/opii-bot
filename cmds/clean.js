module.exports = {
	cat: 'Misc',
	desc: 'Prune bot\'s messages',
	run: function (opii, msg, args) {
		const msgcount = parseInt(args[0]);

		msg.channel.messages.fetch({ limit: 100 }).then(messages => {
			let msg_array = messages.array();
			msg_array = msg_array.filter(m => m.author.id == opii.client.user.id);
			msg_array.length = msgcount;
			msg_array.map(m => m.delete());
		});
	},
	restricted: true
};
