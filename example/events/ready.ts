/* refs: https://github.com/realglaxin/discord-ts-template/blob/main/src/events/client/Ready.ts */
import type { Client } from "discord.js";

import Event from "../classes/Event";

export default class ReadyEvent extends Event {
    constructor(client: Client) {
        super(client, {
            name: "ready",
            one: true
        });
    }

    public async execute(): Promise<void> {
        console.log(`Logged in as ${this.client.user?.tag}!`);
    }
}
