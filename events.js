const parseText = (str, prefix) => {
	if (prefix && !str.startsWith(prefix)) return;

	let cmd = str.split(' ')[0];

	if (prefix) {
		cmd = cmd.substr(prefix.length, cmd.length);
	}

	let argStr = str.substr((prefix && prefix.length || 0) + cmd.length + 1, str.length);
	let args = argStr.split(' ');

	return { cmd: cmd, args: args, argStr: argStr };
};

module.exports = (opii, logger) => {
	opii.client.on('ready', () => {
		opii.client.user.setActivity('you 👀', { type: 'WATCHING' });
		logger.info(`${opii.client.user.tag} online.`);
	});
	opii.client.on('disconnect', (data) => {
		logger.error(`Disconnected. (Code: ${data.code}, Reason: ${(data.reason || '<NONE>')})`);
		if (data.code == '1000') {
			opii.client.destroy().then(() => opii.connect());
		}
	});
	opii.client.on('reconnecting', () => logger.warn('Reconnecting...'));
	opii.client.on('error', (err) => logger.error('Discord.js error:', err));
	opii.client.on('messageCreate', (msg) => {
		if (msg.author.bot || msg.author.id == opii.client.user.id) return;

		let msgData = parseText(msg.content, process.env.BOT_PREFIX);
		if (!msgData) return;

		msgData.cmd = msgData.cmd.toLowerCase();

		let cmd = opii.commands[msgData.cmd];

		if (cmd) {
			if (cmd.restricted && !opii.isAdmin(msg.author.id)) {
				return msg.channel.send('⛔ Sorry, you can\'t do that!');
			}

			logger.command(msg.author, msg.content);

			try {
				cmd.run(opii, msg, msgData.args, msgData.argStr);
			}
			catch (err) {
				msg.channel.send('Something went wrong! Check console for more information.');
				logger.error('Command errored:', err);
			}
		}
	});
};
