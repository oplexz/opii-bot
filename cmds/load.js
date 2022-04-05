module.exports = {
	cat: 'Bot Management',
	desc: 'Load (new) command',
	run: function (self, msg, args) {
		let cmdName = args[0];
		if (!cmdName || !require('fs').existsSync(`./cmds/${cmdName}.js`)) {
			return msg.channel.send('Command does not exist.');
		}

		if (self.commands[cmdName]) {
			return msg.channel.send('That command already exists. Use ``reload`` instead.');
		}

		let cmdData;

		try {
			cmdData = require(`./${cmdName}.js`);
		}
		catch (err) {
			msg.channel.send(`Failed to load \`\`${cmdName}\`\`! Check console for more info.`);
			return console.log(err);
		}

		self.registerCommand(cmdName, cmdData);
		msg.channel.send(`Command \`\`${cmdName}\`\` loaded.`);
	},
	restricted: true,
};
