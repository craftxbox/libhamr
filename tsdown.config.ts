import { defineConfig } from "tsdown";

export default defineConfig({
    entry: ["src/compress.ts", "src/alphabets.ts"],
    format: ["cjs", "esm"],
    dts: true,
    sourcemap: true,
    clean: true,
});
