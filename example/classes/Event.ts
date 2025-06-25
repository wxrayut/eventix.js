/* refs: https://github.com/realglaxin/discord-ts-template/blob/main/src/structures/Event.ts */
import { Client, ClientEvents } from "discord.js";

interface EventOptions {
    name: keyof ClientEvents;
    one?: boolean;
}

export default class Event {
    public client: Client;
    public one: boolean;
    public name: keyof ClientEvents;

    constructor(client: Client, options: EventOptions) {
        this.client = client;
        this.name = options.name;
        this.one = options.one ?? false;
    }

    public async execute(..._args: unknown[]): Promise<void> {
        return;
    }
}
