module.exports = {
	cat: 'Development',
	desc: 'Executes system commands in current environment',
	run: function (_, msg, _, argStr) {
		try {
			msg.channel.send('```\n' + require('child_process').execSync(argStr).toString() + '```');
		}
		catch (err) {
			msg.channel.send('Uh-oh :(\n```\n' + err.message + '```');
		}
	},
	restricted: true,
};
