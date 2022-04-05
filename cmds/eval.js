function truncate(str) {
	let ending = '... (output truncated)';
	let length1 = 1991;
	let length2 = length1 - ending.length;
	if (str.length > length1) {
		return '```js\n' + str.substr(0, length2) + '```' + ending;
	}
	else {
		return '```js\n' + str + '```';
	}
}

module.exports = {
	cat: 'Development',
	desc: 'Evaluate code',
	run: function (opii, msg, _, argStr) {
		try {
			let evaled = eval(argStr);
			if (typeof evaled != 'string') {
				evaled = require('util').inspect(evaled, { depth: 0 });
			}

			let sensitive = [opii.client.token];
			for (let a in sensitive) {
				evaled = evaled.replace(new RegExp(sensitive[a], 'g'), '[CENSORED]');
			}

			msg.channel.send(truncate(evaled));
		}
		catch (err) {
			return msg.channel.send(truncate(err));
		}
	},
	restricted: true,
};
