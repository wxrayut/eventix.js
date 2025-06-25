import { Client, GatewayIntentBits } from "discord.js";

export const client = new Client({
    intents: [
        GatewayIntentBits.Guilds
        /* whatever else you need. */
    ]
});
