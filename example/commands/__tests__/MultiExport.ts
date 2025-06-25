import type { Client } from "discord.js";

import Command from "../../classes/Command";

export class FuckyouCommand extends Command {
    constructor(client: Client) {
        super(client, {
            name: "fuckyou",
            description: {
                content: "Fuck you",
                usage: "fuckyou",
                examples: ["fuckyou"]
            },
            permissions: {
                dev: false
            },
            slashCommand: true
        });
    }

    public async execute(): Promise<void> {
        console.log("Fuck you!");
    }
}

export class EchoCommand extends Command {
    constructor(client: Client) {
        super(client, {
            name: "echo",
            description: {
                content: "Echo",
                usage: "echo",
                examples: ["echo"]
            },
            permissions: {
                dev: false
            },
            slashCommand: true
        });
    }

    public async execute(): Promise<void> {
        console.log("Echo!");
    }
}
