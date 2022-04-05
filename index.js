const logger = require('./logger.js');
logger.warn('Initializing...');

const opii = {};

opii.Discord = require('discord.js');
opii.client = new opii.Discord.Client();

logger.warn('Loading config...');
opii.config = require('./config.js');

logger.warn('Loading events...');
require('./events.js')(opii, logger);

opii.commands = {};

opii.registerCommand = function (name, data) {
	opii.commands[name] = {
		desc: data.desc,
		cat: data.cat,
		run: data.run,
		restricted: data.restricted,
	};
};

const loadCommand = async (file) => {
	return new Promise((resolve) => {
		let cmdName = file.replace(/\.[^/.]+$/, '');
		if (cmdName.startsWith('_')) return resolve();

		try {
			let data = require(`./cmds/${cmdName}`);
			opii.registerCommand(cmdName, data);
			// logger.info(`Command '${cmdName}' loaded.`);
		}
		catch (err) {
			logger.error(`Command ${file} failed to load:\n${err.stack}`);
			return resolve();
		}

		resolve();
	});
};

const loadCommands = async () => {
	return new Promise((resolve) => {
		let fs = require('fs');
		fs.readdir('./cmds/', async (err, files) => {
			if (err) {
				logger.error('FS errored:', err);
				return resolve();
			}

			files.forEach(async (file) => await loadCommand(file));

			logger.info(`${Object.keys(opii.commands).length} command(s) loaded.`);
			resolve();
		});
	});
};

opii.colorutils = require('./colorutils.js');

opii.isAdmin = id => opii.config.admins.includes(id);

(async () => {
	logger.warn('Loading commands...');
	await loadCommands();
	logger.warn('Attempting to log in...');
	opii.client.login(opii.config.token);
})();

process.on('uncaughtException', (err) => logger.error('Uncaught exception:', err));
process.on('unhandledRejection', (err, promise) => logger.error('Unhandled rejection: ', promise));
