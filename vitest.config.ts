import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        globals: true,
        environment: "node",
        include: ["test/**/*.test.ts", "a.test.ts"],
        exclude: ["dist", "node_modules"],
        testTimeout: 10000
    },
    esbuild: {
        target: "node20"
    }
});
