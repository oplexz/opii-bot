const isColor = (str) => {
	if (!str || typeof str != 'string') return false;

	return /^([0-9a-f]{3}){1,2}$/i.test(str.replace('#', ''));
};

const formatColor = (hex) => {
	hex = hex.replace('#', '');

	if (/^[0-9a-f]{3}$/i.test(hex)) {
		hex = hex[0].repeat(2) + hex[1].repeat(2) + hex[2].repeat(2);
	}

	if (hex == '000000') {
		return '010101';
	}
	else {
		return hex;
	}
};

const getUserColor = (msg, user) => {
	let roles = msg.guild.member(user).roles.cache.filter(r => r.name.indexOf('CColour - ') > -1);

	if (roles.size > 1) {
		let highestRole;
		roles.forEach(role => {
			if (!highestRole || role.comparePositionTo(highestRole)) {
				highestRole = role;
			}
		});

		return highestRole.name.replace('CColour - ', '');
	}
	else if (roles.size == 1) {
		return roles.first().name.replace('CColour - ', '');
	}
	else {
		return '<NONE>';
	}
};

const takeColor = (msg, user) => {
	return new Promise((resolve) => {
		user = msg.guild.member(user);
		user.roles.cache.filter(r => r.name.indexOf('CColour - ') > -1).forEach(r => {
			user.roles.remove(r.id).then(() => {
				r.members.size < 1 && msg.guild.roles.cache.get(r.id).delete();
			});
		});
		resolve();
	});
};

const createRole = (msg, color) => {
	return msg.guild.roles.create({
		data: {
			name: 'CColour - ' + color.toLowerCase(),
			color: color,
			permissions: [],
			hoist: false,
			// position: 0,
		}
	});
};

const giveColor = (msg, user, color) => {
	return new Promise(async (resolve) => {
		await takeColor(msg, user);
		let role = msg.guild.roles.cache.find(r => r == ('CColour - ' + color.toLowerCase()));
		user = msg.guild.member(user);
		if (!role) {
			createRole(msg, color).then(r => user.roles.add(r.id));
			resolve();
		}
		else {
			user.roles.add(role.id);
			resolve();
		}
	});
};

module.exports = {
	isColor, formatColor, getUserColor, takeColor, createRole, giveColor,
};
