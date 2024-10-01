/**
 * Bonux JS
 * HW 02
 * Дано ціле число x. Поверніть true, якщо число є паліндромом, і false в іншому випадку.
 */

const n = process.argv[2];

function isPalindron(n) {
    const n_str = n.toString();
    for(let i = 0; i < Math.floor(n_str.length / 2); i++) {
        const leftIndex = i;
        const rightIndex = n_str.length - i - 1;

        if (n_str[leftIndex] !== n_str[rightIndex]) {
            return false;
        }
    }

    return true;
}

const result = isPalindron(n);

console.log('result: ', result)
