const fs = require('fs');

function generateRandomString(wordCount, minWordLength, maxWordLength) {
    // Define the characters we'll use
    const chars = 'abcdefghijklmnopqrstuvwxyz1234567890';

    // Function to generate a random word with length between minWordLength and maxWordLength
    function generateWord() {
        // Generate a random length between minWordLength and maxWordLength
        const length = Math.floor(Math.random() * (maxWordLength - minWordLength + 1)) + minWordLength;
        let word = '';
        for (let i = 0; i < length; i++) {
            word += chars[Math.floor(Math.random() * chars.length)];
        }
        return word;
    }

    // Generate words with varying lengths
    const words = Array.from({ length: wordCount }, generateWord);

    // Shuffle the array
    for (let i = words.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [words[i], words[j]] = [words[j], words[i]];
    }

    return words;
}

function generatePrimes(count) {

    function isPrime(n) {
        if (n <= 1) return false;
        if (n === 2) return true;
        if (n % 2 === 0) return false;

        const sqrtN = Math.floor(Math.sqrt(n));
        for (let i = 3; i <= sqrtN; i += 2) {
            if (n % i === 0) return false;
        }
        return true;
    }

    // Handle edge cases
    if (count <= 0) return [];

    const primes = [];

    let num = 2;
    while (primes.length < count) {
        if (isPrime(num)) {
            primes.push(num);
        }
        num++;
    }

    return primes;
}

const hashKeyValue = (base, mod, string, size) => {
    const bigBase = BigInt(base);
    const bigMod = BigInt(mod);
    const bigSize = BigInt(size);

    return Array.from(string).reduce((previous, char) => {
        const asciiValue = BigInt(char.charCodeAt(0));
        return ((previous * bigBase + asciiValue) % bigMod) % bigSize;
    }, 0n);
};

const checkCollision = (hashValueList = []) => {
    const occurrenceMap = {};

    hashValueList.forEach(item => {
        occurrenceMap[item] = (occurrenceMap[item] || 0) + 1;
    });

    const sortedItems = Object.entries(occurrenceMap)
        .sort((a, b) => b[1] - a[1]);

    let output = '';
    sortedItems.forEach(([item, count]) => {
        const occurrenceString = count > 1 ? `collied ${count} times` : 'does not collied';
        output += `${item} ${occurrenceString}\n`;
    });

    const totalOccurrence = sortedItems.reduce((sum, [, count]) => sum + (count > 1 ? count : 0), 0);
    // console.log(`${output}total collision ${totalOccurrence} times`.trim());
    return totalOccurrence;
};

const exportToCSV = (collisionData) => {
    // Define the CSV header
    let csvContent = "Base Value, Collisions\n";

    // Convert each object in collisionData into a CSV row
    collisionData.forEach(data => {
        csvContent += `${data.baseValue}, ${data.collisions}\n`;
    });

    // Write the CSV content to a file
    fs.writeFileSync('collision_data.csv', csvContent, 'utf8');
    console.log('CSV file has been saved as collision_data.csv');
};

// Usage example
const primeCount = 100;
const numberOfWords = 500;
const minWordLenght = 5;
const maxWordLenght = 25;
const mod = 359334085968622831041960188598043661065388726959079837n;
const size = 1000;

// const baseList = generatePrimes(primeCount);
// const randomString = generateRandomString(numberOfWords, wordLenght);

// const main = () => {
//     let collisionData = [];
//     for (let i = 0; i < baseList.length; i++) {
//         let hashValueList = [];
//         for (let j = 0; j < randomString.length; j++) {
//             const value = hashKeyValue(baseList[i], mod, randomString[j], size);
//             hashValueList.push(value);
//         }
//         const collisionCount = checkCollision(hashValueList);
//         collisionData.push({
//             baseValue: baseList[i],
//             collisions: collisionCount
//         });
//     }

//     collisionData.sort((a, b) => a.collisions - b.collisions);

//      // Export the sorted data to CSV
//      exportToCSV(collisionData);

//     collisionData.forEach(data => {
//         console.log(`For base value : ${data.baseValue} : Total collision --> ${data.collisions} times`);
//     });
// }


// main();

const main = async () => {
    const baseList = generatePrimes(primeCount);
    const randomString = generateRandomString(numberOfWords, minWordLenght, maxWordLenght);

    // Create an array of promises to process each base in parallel
    const collisionPromises = baseList.map(baseValue => {
        return new Promise((resolve) => {
            let hashValueList = [];
            for (let j = 0; j < randomString.length; j++) {
                const value = hashKeyValue(baseValue, mod, randomString[j], size);
                hashValueList.push(value);
            }
            const collisionCount = checkCollision(hashValueList);
            resolve({
                baseValue,
                collisions: collisionCount
            });
        });
    });

    // Wait for all promises to resolve
    const collisionData = await Promise.all(collisionPromises);

    // Sort the collision data and export it to CSV
    collisionData.sort((a, b) => a.collisions - b.collisions);
    exportToCSV(collisionData);

    // Output the collision results
    collisionData.forEach(data => {
        console.log(`For base value: ${data.baseValue} -> Total collisions: ${data.collisions} times`);
    });
}

main();