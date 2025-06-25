import { type Options, build } from "tsup";

const tsupOptions: Options = {
    entry: ["src/index.ts"],
    splitting: false,
    sourcemap: false,
    clean: true,
    target: "node20",
    minify: false,
    shims: true,
    skipNodeModulesBundle: true
} satisfies Options;

async function runBuild() {
    await Promise.all([
        /* esm */
        build({
            format: ["esm"],
            outDir: "dist/esm",
            dts: false,
            ...tsupOptions
        }),

        /* cjs */
        build({
            format: ["cjs"],
            outDir: "dist",
            dts: true,
            ...tsupOptions
        })
    ]);
}

runBuild();
