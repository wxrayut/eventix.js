/* refs: https://github.com/realglaxin/discord-ts-template/blob/main/src/events/client/InteractionCreate.ts */
import type { BaseInteraction, Client } from "discord.js";

import Event from "../classes/Event";

export default class InteractionCreate extends Event {
    constructor(client: Client) {
        super(client, {
            name: "interactionCreate"
        });
    }

    public async execute(interaction: BaseInteraction): Promise<void> {
        if (interaction.isChatInputCommand()) {
            /* do something. */
        }
    }
}
