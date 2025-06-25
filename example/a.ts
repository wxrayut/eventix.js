import path from "node:path";

import { Eventix } from "../src";

import { client } from "./client";

/**
 * Custom base classes for typed event modules.
 */
import Event from "./classes/Event";

async function example() {
    const dir = path.join(__dirname, "events");

    await Eventix<Event>(
        dir,
        (event) => {
            const handler = (...args: Parameters<typeof event.execute>) => {
                event.execute(...args);
            };

            /* Register the event to the Discord bot client */
            if (event.one) {
                client.once(event.name, handler);
            } else {
                client.on(event.name, handler);
            }
        },
        {
            extensions: [".ts"],
            recursive: false
        }
    );
}

/* example(); */
