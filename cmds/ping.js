module.exports = {
	desc: 'A ping command!',
	cat: 'Misc',
	run: function (opii, msg) {
		msg.channel.send('​').then(msg2 => {
			msg2.edit(`Pong! (${(msg2.createdTimestamp - msg.createdTimestamp)}ms)`);
		});
	},
};
