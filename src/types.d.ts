declare module "@ha.mr/compress.js" {
    /**
     * Compresses the input link and encodes it to the given alphabet.
     * @param {string} input Link to compress
     * @param {string[]} alphabet Output alphabet as array of characters/strings
     * @returns {string} Output payload (not a full link!)
     */
    export function compress(input: string, alphabet: string[]): string;

    /**
     * Decodes and decompresses the payload assuming the given alphabet and
     * produces a full link.
     * @param {string} input Compressed payload
     * @param {string[]} alphabet Ordered alphabet used by payload
     * @returns {string} Full link containing payload contents.
     */
    export function decompress(input: strin, alphabet: string[]): string;
}

declare module "@ha.mr/alphabets.js" {
    export const outputAlphabetASCII: string[];
    export const outputAlphabetQR: string[];
    export const outputAlphabetEmoji: string[];
}
