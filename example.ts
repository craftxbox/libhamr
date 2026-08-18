import { compress, decompress } from "libhamr";
import { outputAlphabetASCII, outputAlphabetQR, outputAlphabetEmoji } from "libhamr/alphabets";

const command = process.argv[2]?.trim() || "encode";
const input = process.argv[3]?.trim();
const options = input[0] === "-" ? input.slice(2) : undefined;

if (!command || !input) {
    console.error("Usage: node example.js <encode|decode> [-a|-q|-e] <input>");
    console.error("Options: -a for ASCII, -q for QR, -e for Emoji");
    process.exit(1);
}

function getAlphabet(option: string | undefined): string[] {
    switch (option) {
        case "-a":
            return outputAlphabetASCII;
        case "-q":
            return outputAlphabetQR;
        case "-e":
            return outputAlphabetEmoji;
    }

    return outputAlphabetASCII;
}
        

function encode(input: string, alphabet: string[]): string {
    return compress(input, alphabet);
}

function decode(input: string): string {
    return decompress(input);
}

const alphabet = getAlphabet(options);

if (command === "encode") {
    const encoded = encode(input, alphabet);
    const prefix = alphabet === outputAlphabetQR ? "HTTP://HA.MR/" : "https://ha.mr#";
    console.log(`Encoded: ${prefix}${encoded}`);
}

else if (command === "decode") {
    const decoded = decode(input);
    console.log(`Decoded: ${decoded}`);
}


