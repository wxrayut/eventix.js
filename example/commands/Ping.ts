/* refs: https://github.com/realglaxin/discord-ts-template/blob/main/src/commands/information/Ping.ts */
import type { Client } from "discord.js";

import Command from "../classes/Command";

export default class PingCommand extends Command {
    constructor(client: Client) {
        super(client, {
            name: "ping",
            description: {
                content: "Ping the bot",
                usage: "ping",
                examples: ["ping"]
            },
            permissions: {
                dev: false
            },
            slashCommand: true
        });
    }

    public async execute(): Promise<void> {
        /* do something. */
    }
}
