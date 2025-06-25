/* refs: https://github.com/realglaxin/discord-ts-template/blob/main/src/structures/Command.ts */
import {
    type APIApplicationCommandOption,
    Client,
    PermissionFlagsBits,
    type PermissionResolvable
} from "discord.js";

interface CommandDescription {
    content: string;
    usage: string;
    examples: string[];
}

interface CommandPermissions {
    dev: boolean;
    client: string[] | PermissionResolvable;
    user: string[] | PermissionResolvable;
}

interface CommandOptions {
    name: string;
    name_localizations?: Record<string, string>;
    description?: Partial<CommandDescription>;
    description_localizations?: Record<string, string>;
    aliases?: string[];
    cooldown?: number;
    args?: boolean;
    permissions?: Partial<CommandPermissions>;
    slashCommand?: boolean;
    options?: APIApplicationCommandOption[];
    category?: string;
}

export default class Command {
    public client: Client;
    public name: string;
    public name_localizations?: Record<string, string>;
    public description: CommandDescription;
    public description_localizations?: Record<string, string>;
    public aliases: string[];
    public cooldown: number;
    public args: boolean;
    public permissions: CommandPermissions;
    public slashCommand: boolean;
    public options: APIApplicationCommandOption[];
    public category: string;

    constructor(client: Client, options: CommandOptions) {
        this.client = client;
        this.name = options.name;
        this.name_localizations = options.name_localizations ?? {};
        this.description = {
            content: options.description?.content ?? "",
            usage: options.description?.usage ?? "",
            examples: options.description?.examples ?? []
        };
        this.description_localizations =
            options.description_localizations ?? {};
        this.aliases = options.aliases ?? [];
        this.cooldown = options.cooldown ?? 0;
        this.args = options.args ?? false;
        this.permissions = {
            dev: options.permissions?.dev ?? false,
            client: options.permissions?.client ?? [
                PermissionFlagsBits.SendMessages,
                PermissionFlagsBits.ReadMessageHistory,
                PermissionFlagsBits.ViewChannel,
                PermissionFlagsBits.EmbedLinks
            ],
            user: options.permissions?.user ?? []
        };
        this.slashCommand = options.slashCommand ?? false;
        this.options = options.options ?? [];
        this.category = options.category ?? "general";
    }

    public async execute(
        _client: Client,
        _message: unknown,
        _args: string[]
    ): Promise<unknown> {
        return;
    }
}
