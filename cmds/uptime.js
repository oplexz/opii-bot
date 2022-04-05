const format = (seconds) => {
	d = Math.floor(seconds / 86400);
	h = Math.floor(seconds / 3600) % 24;
	m = Math.floor(seconds % 3600 / 60);
	s = Math.floor(seconds % 60);

	const suffix = (n, str) => `${n} ` + (n != 1 ? str + "s" : str) + " ";

	return (d > 0 ? suffix(d, "day") : "") + (h > 0 ? suffix(h, "hour") : "") + (h > 0 || m > 0 ? suffix(m, "minute") : "") + suffix(s, "second");
};

module.exports = {
	cat: "Bot Info",
	desc: "Shows current uptime",
	run: function (_, msg) {
		const uptime = format(process.uptime());
		const sys_uptime = format(parseFloat(require("child_process").execSync("awk '{print $1}' /proc/uptime")));
		msg.channel.send(`Bot: \`${uptime}\`\nSystem: \`${sys_uptime}\``);
	},
};
