import { defineConfig } from "tsdown";

export default defineConfig({
    entry: ["src/compress.ts"],
    format: ["cjs", "esm"],
    dts: true,
    sourcemap: true,
    clean: true,
});
