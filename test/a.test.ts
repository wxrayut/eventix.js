import fs from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { Eventix } from "../src";

import Command from "../example/classes/Command";
import Event from "../example/classes/Event";

const root = path.join(__dirname, "..");
const eventPath = path.join(root, "example/events");
const commandPath = path.join(root, "example/commands");

describe("🧪 Eventix", () => {
    it("should load all events", async () => {
        const loaded: Event[] = [];

        await Eventix<Event>(eventPath, (event) => loaded.push(event), {
            extensions: [".ts"]
        });

        expect(loaded.length).toBeGreaterThan(0);

        loaded.forEach((event) => expect(event).toBeInstanceOf(Event));
    });

    it("should load all commands", async () => {
        const loaded: Command[] = [];

        await Eventix<Command>(commandPath, (command) => loaded.push(command), {
            extensions: [".ts"],
            transform: (mod) =>
                typeof mod === "object" ? Object.values(mod as object) : mod
        });

        expect(loaded.length).toBeGreaterThan(0);

        loaded.forEach((command) => expect(command).toBeInstanceOf(Command));
    });
});

describe("🧪 Eventix Options", () => {
    it("filterDir: should skip directories that return false", async () => {
        const collected: string[] = [];

        await Eventix<Event>(
            eventPath,
            (_event, fp) => {
                collected.push(fp);
            },
            {
                filterDir: (entry) => entry.name !== "__tests__"
            }
        );

        expect(collected.every((fp) => !fp.includes("__tests__"))).toBe(true);
    });

    it("filterFile: should skip specific files", async () => {
        const skipped: string[] = [];

        await Eventix<Event>(eventPath, (_event) => {}, {
            filterFile: (_, fp) => {
                if (fp.includes("draft.ts")) {
                    skipped.push(fp);
                    return false;
                }
                return true;
            }
        });

        expect(skipped.some((fp) => fp.endsWith("draft.ts"))).toBe(true);
    });

    it("extensions: should only load matching extensions", async () => {
        const loaded: string[] = [];

        await Eventix<Event>(
            eventPath,
            (_, fp) => {
                loaded.push(fp);
            },
            {
                extensions: [".ts"] /* exclude .js if any */
            }
        );

        expect(loaded.every((fp) => fp.endsWith(".ts"))).toBe(true);
    });

    it("recursive: should not go into subdirectories if false", async () => {
        const loaded: string[] = [];

        await Eventix<Event>(
            eventPath,
            (_, fp) => {
                loaded.push(fp);
            },
            {
                recursive: false
            }
        );

        const hasSubdir = loaded.some((fp) => fp.includes("__tests__"));
        expect(hasSubdir).toBe(false);
    });

    it("ignore: should skip files matching ignore patterns", async () => {
        const skipped: string[] = [];

        await Eventix<Event>(eventPath, () => {}, {
            ignore: ["__tests__"],
            onSkip: (fp) => {
                if (fp.includes("__tests__")) {
                    skipped.push(fp);
                }
            }
        });

        expect(skipped.length).toBeGreaterThan(0);
        expect(skipped[0].endsWith("__tests__")).toBe(true);
    });

    it("lazy: should return file path instead of loaded module", async () => {
        const received: string[] = [];

        await Eventix<string>(
            commandPath,
            /* Because lazy = true */
            (fp) => {
                received.push(fp);
                expect(typeof fp).toBe("string");
            },
            {
                lazy: true
            }
        );

        expect(received.length).toBeGreaterThan(0);
    });

    it("instantiate: should skip instantiation if false", async () => {
        const rawInstances: any[] = [];

        await Eventix<Command>(
            commandPath,
            (item) => {
                typeof item === "object"
                    ? Object.values(item).forEach((i) => rawInstances.push(i))
                    : rawInstances.push(item);
            },
            {
                instantiate: false
            }
        );

        expect(rawInstances.length).toBeGreaterThan(0);

        rawInstances.forEach((instance) => {
            expect(typeof instance === "function").toBe(true);
        });
    });

    it("args: should pass args into class constructor", async () => {
        const args: string[] = [];

        const tmp = path.join(__dirname, "__tmp__.js");
        await fs.promises.writeFile(
            tmp,
            `export default class Test {
    constructor(name) {
        if (name === "InjectedArg") globalThis.injected = true;
    }
}`
        );

        await Eventix(__dirname, () => {}, {
            args: ["InjectedArg"]
        });

        expect(globalThis.injected).toBe(true);

        await fs.promises.unlink(tmp);
        delete globalThis.injected;
    });

    it("transform: should modify or extract values from module", async () => {
        const loaded: Command[] = [];

        await Eventix<Command>(
            commandPath,
            (command) => {
                loaded.push(command);
            },
            {
                /* Transforms multiple exports module into
                   a single array. (See: ./example/commands/__tests__/MultiExport.ts) */
                transform: (mod) =>
                    typeof mod === "object" ? Object.values(mod as object) : mod
            }
        );

        expect(loaded.length).toBeGreaterThan(0);

        loaded.forEach((command) => {
            expect(command).toBeInstanceOf(Command);
        });
    });

    it("onSuccess: should be called when module loads", async () => {
        const paths: string[] = [];

        await Eventix<Command>(commandPath, () => {}, {
            onSuccess: (fp) => paths.push(fp)
        });

        expect(paths.length).toBeGreaterThan(0);

        paths.forEach((fp) => {
            expect(fp.includes("commands")).toBe(true);
        });
    });

    it("onSkip: should be called with reason", async () => {
        const calls: [string, string][] = [];

        await Eventix(eventPath, () => {}, {
            lazy: true,
            /* loads only .js files */
            extensions: [".js"],
            /* you should receive the reason: `unsupported file extension` */
            onSkip: (fp, reason) => calls.push([fp, reason])
        });

        expect(calls.length).toBeGreaterThan(0);

        calls.forEach(([fp, reason]) => {
            expect(fp.endsWith(".ts")).toBe(true);
            expect(reason === "unsupported file extension").toBe(true);
        });
    });

    it("onError: should catch and report errors", async () => {
        const brokenPath = path.join(__dirname, "__broken__.js");
        await fs.promises.writeFile(brokenPath, `throw new Error("Fuck off")`);

        let captured = false;

        await Eventix(__dirname, () => {}, {
            onError: (err) => {
                if (err instanceof Error && err.message === "Fuck off") {
                    captured = true;
                }
            }
        });

        expect(captured).toBe(true);

        await fs.promises.unlink(brokenPath);
    });
});
