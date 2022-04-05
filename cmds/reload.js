function searchCache(moduleName, callback) {
	let mod = require.resolve(moduleName);
	if (mod && ((mod = require.cache[mod]) !== undefined)) {
		(function traverse(_mod) {
			_mod.children.forEach(child => {
				traverse(child);
			});
			callback(_mod);
		}(mod));
	}
}

function purgeCache(moduleName) {
	searchCache(moduleName, mod => {
		delete require.cache[mod.id];
	});

	Object.keys(module.constructor._pathCache).forEach(cacheKey => {
		if (cacheKey.indexOf(moduleName) > 0) {
			delete module.constructor._pathCache[cacheKey];
		}
	});
}

module.exports = {
	cat: 'Bot Management',
	desc: 'Reload commands',
	run: function (opii, msg, args) {
		if (!args[0] || !opii.commands[args[0]]) {
			return msg.channel.send('That command does not exist!');
		}

		let path = `./${args[0]}.js`;
		purgeCache(path);
		opii.registerCommand(args[0], require(path));
		msg.channel.send('Command ``' + args[0] + '`` reloaded.');
	},
	restricted: true,
};
