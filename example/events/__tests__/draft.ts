import { Client } from "discord.js";

import Event from "../../classes/Event";

export default class Draft extends Event {
    constructor(client: Client) {
        super(client, {
            name: "debug"
        });
    }
}
