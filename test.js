// Original string
const str = "AAABBCDDD";

console.log("Original string: " + str);

/**
 * Compress a string by replacing sequences of repeating characters 
 * with the character followed by the count of its occurrences.
 * @param {string} input - Original string to compress.
 * @returns {string} - Compressed string.
 */
const compress = (input = "") => {
    if (!input) return "";

    let compressed = [];
    let count = 1;

    for (let i = 1; i <= input.length; i++) {
        if (input[i] === input[i - 1]) {
            count++;
        } else {
            compressed.push(input[i - 1]);
            if (count > 1) compressed.push(count);
            count = 1;
        }
    }

    return compressed.join("");
};

/**
 * Extract the original string from a compressed string.
 * @param {string} input - Compressed string to decompress.
 * @returns {string} - Original string.
 */
const extract = (input = "") => {
    if (!input) return "";

    let extracted = [];
    let i = 0;

    while (i < input.length) {
        let char = input[i];
        let count = "";

        // Check for numeric digits after the character
        while (i + 1 < input.length && !isNaN(input[i + 1])) {
            count += input[++i];
        }

        count = count ? parseInt(count, 10) : 1;
        extracted.push(char.repeat(count));
        i++;
    }

    return extracted.join("");
};

// Test the functions
const compressedString = compress(str);
const extractedString = extract(compressedString);

console.log("Compressed string: " + compressedString);
console.log("Extracted string: " + extractedString);
