import { outputAlphabetASCII, outputAlphabetEmoji, outputAlphabetQR } from "./alphabets.ts";
import { compress as _compress, decompress as _decompress } from "@ha.mr/compress.js";

export function compress(input: string, alphabet: string[] = outputAlphabetASCII): string {
    return _compress(input, alphabet);
}

export function decompress(input: string, alphabet?: string[]): string {
    if (alphabet) return _decompress(input, alphabet);

    let payload: string;
    let urlObj = new URL(input);
    if (urlObj.hash) {
        // Decode hash value in case it's non-ASCII
        payload = decodeURIComponent(urlObj.hash.slice(1));
        // Remove all whitespace - we never use whitespace when encoding hash values
        payload = payload.replaceAll(" ", "");
        // Check if input is pure ASCII - potentially unreliable?
        const useEmoji = Array.from(payload).some((c) => !outputAlphabetASCII.includes(c));
        alphabet = useEmoji ? outputAlphabetEmoji : outputAlphabetASCII;
    } else {
        // If no hash value, we're likely reading a QR code
        // For that, use the path instead
        payload = decodeURIComponent(urlObj.pathname.slice(1));
        alphabet = outputAlphabetQR;
    }

    return _decompress(payload, alphabet);
}
