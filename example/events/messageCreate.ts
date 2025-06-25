/* refs: https://github.com/realglaxin/discord-ts-template/blob/main/src/events/client/MessageCreate.ts */
import type { Client } from "discord.js";

import Event from "../classes/Event";

export default class MessageCreate extends Event {
    constructor(client: Client) {
        super(client, {
            name: "messageCreate"
        });
    }

    public async execute(): Promise<void> {
        /* do something. */
    }
}
