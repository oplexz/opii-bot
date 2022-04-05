module.exports = {
	desc: 'Sends a random cat',
	cat: 'Misc',
	run: function (self, msg) {
		require("snekfetch").get("https://api.thecatapi.com/v1/images/search?mime_types=jpg,png").then(data => {
			const embed = new self.Discord.MessageEmbed();
			embed.setTitle("Whoosh")
			embed.setImage(data.body[0].url);

			msg.channel.send({ embed });
		});
	},
};
