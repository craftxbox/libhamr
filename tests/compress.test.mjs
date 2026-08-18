import { describe, test, expect } from "@jest/globals";
import { compress, decompress } from "../src/compress.ts";
import { outputAlphabetASCII, outputAlphabetQR, outputAlphabetEmoji } from "../src/alphabets.ts";

describe("ha.mr compression", () => {
    test("compress() works", () => {
        for (const alphabet of [outputAlphabetASCII, outputAlphabetQR, outputAlphabetEmoji]) {
            const url = "https://example.com/docs/guide?lang=en&v=1#intro";
            const compressed = compress(url, alphabet);
            expect(typeof compressed).toBe("string");
            expect(compressed.length).toBeGreaterThan(0);
            expect(compressed).not.toBe("");
        }
    });

    test("decompress() works", () => {
        const url = "http://ha.mr#[J@vBG-]?Hh__OEs,*dxD7Rh[ZpU5";
        const decompressed = decompress(url);
        expect(typeof decompressed).toBe("string");
        expect(decompressed.length).toBeGreaterThan(0);
        expect(decompressed).not.toBe("");
    });

    test("decompress(compress(x)) yields the same URL as x", () => {
        for (const alphabet of [outputAlphabetASCII, outputAlphabetQR, outputAlphabetEmoji]) {
            const url = "https://example.com/docs/guide?lang=en&v=1#intro";
            const compressed = compress(url, alphabet);
            const decompressed = decompress(compressed, alphabet);
            const urlObj = new URL(url);
            const decompressedObj = new URL(decompressed);
            expect(decompressedObj.href).toBe(urlObj.href);
        }
    });

    test("decompres() selects the correct alphabet for decompression", () => {
        const url = "https://example.com/docs/guide?lang=en&v=1#intro";
        const compressedASCII = "https://ha.mr#" + compress(url, outputAlphabetASCII);
        const compressedQR = "HTTP://HA.MR/" + compress(url, outputAlphabetQR);
        const compressedEmoji = "https://ha.mr#" + compress(url, outputAlphabetEmoji);

        for (const compressed of [compressedASCII, compressedQR, compressedEmoji]) {
            const decompressed = decompress(compressed);
            const urlObj = new URL(url);
            const decompressedObj = new URL(decompressed);
            expect(decompressedObj.href).toBe(urlObj.href);
        }
    });
});
