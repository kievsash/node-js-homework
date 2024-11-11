function createGenerator() {
    let count = 0;

    return function () {
        if (count < 3) {
            return ++count;
        } else {
            return undefined;
        }
    };
}

const generator2 = createGenerator();

console.log(generator2()); // 1
console.log(generator2()); // 2
console.log(generator2()); // 3
console.log(generator2()); // undefined
