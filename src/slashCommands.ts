import { log } from "./logger";
import { readdirSync } from "fs";
import { join } from "path";

const { token, client_id } = require("../config.json");
const { REST, Routes } = require("discord.js");

log.silly("Hello World!");

const commands = [];
// const commands = [
//     {
//         name: "ping",
//         description: "Replies with Pong!"
//     }
// ];

// Grab all the command files from the commands directory you created earlier
const commandsPath = join(__dirname, "commands");
const commandFiles = readdirSync(commandsPath).filter((file) => file.endsWith(".js"));

// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
}

const rest = new REST({ version: "10" }).setToken(token);

(async () => {
    try {
        log.info("Started refreshing application (/) commands.");

        await rest.put(Routes.applicationCommands(client_id), { body: commands });

        log.info("Successfully reloaded application (/) commands.");
    } catch (error) {
        console.error(error);
    }
})();
