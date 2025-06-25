import type { Dirent } from "node:fs";

/**
 * Callback for each loaded module.
 *
 * @template T - The type of the loaded item (e.g. a Command, Event, etc.)
 */
export type EventixCallback<T> = (
    /* The loaded class, instance, or value. */
    instance: T,

    /* The file path of the loaded module. */
    fp: string
) => void;

/**
 * Options to control Eventix behavior.
 */
export type EventixOptions<T = unknown> = {
    /**
     * Filter folders to recurse into.
     *
     * Return false to skip this directory.
     */
    filterDir?: (entry: Dirent) => boolean;

    /**
     * Filter files to load.
     *
     * Return false to skip this file.
     */
    filterFile?: (entry: Dirent, fp: string) => boolean;

    /**
     * List of file extensions to consider for loading.
     */
    extensions?: string[];

    /**
     * Whether to recurse into subfolders.
     */
    recursive?: boolean;

    /**
     * Skip files that match any of these substrings in their path.
     *
     * @example ["__tests__", "draft.js"]
     */
    ignore?: string[];

    /* ────────────── Load Behavior ────────────── */

    /**
     * If true, will not load (import/require) the files immediately.
     * Instead, return the file paths list for lazy loading.
     */
    lazy?: boolean;

    /**
     * If true and the export is a class, it will call `new Class(...args)`.
     * Otherwise, the value will be passed as-is.
     */
    instantiate?: boolean;

    /**
     * Arguments to pass into the class constructor.
     * These will be spread into `new Module(...args)`.
     */
    args?: unknown[];

    /**
     * Let you change or extract what you want from the loaded module.
     * Can return a single item or an array of items.
     */
    transform?: (mod: T) => T | T[];

    /* ────────────── Debug & Logging ────────────── */

    /**
     * Called when a file is successfully loaded.
     */
    onSuccess?: (fp: string) => void;

    /**
     * Called when a file is skipped.
     */
    onSkip?: (fp: string, reason: string) => void;

    /**
     * Called when a file fails to load.
     */
    onError?: (error: unknown, fp: string) => void;
};
