import { globSync } from "glob";
import { join } from "path";
import { BaseInteraction, Client, Collection, Events, GatewayIntentBits, SlashCommandBuilder } from "discord.js";
import { log } from "./logger";

export default class MyClient extends Client {
    commands: Collection<any, any>; // use correct type :)
    constructor(options: any) {
        super(options);
        this.commands = new Collection();
        this.loadCommands();
    }
    loadCommands() {
        const commandsPath = join(__dirname, "commands");

        globSync(`**/*.*`, { cwd: commandsPath }).forEach((file) => {
            const filePath = join(commandsPath, file);
            const command: { data: SlashCommandBuilder; execute: (interaction: string) => any } =
                require(filePath).default;
            if ("data" in command && "execute" in command) {
                this.commands.set(command.data.name, command);
                log.info(command.data);
            } else {
                log.warn(`The command at ${filePath} is missing a required "data" or "execute" property.`);
            }
        });
    }
}

const client = new MyClient({ intents: [GatewayIntentBits.Guilds] });

const { token } = require("../config.json");

client.once(Events.ClientReady, () => {
    log.info("Ready!");
});

client.on(Events.InteractionCreate, async (interaction: BaseInteraction) => {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        log.error(error);
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({
                content: "There was an error while executing this command!",
                ephemeral: true
            });
        } else {
            await interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
        }
    }
});

client.login(token);
