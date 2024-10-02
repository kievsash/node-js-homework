/**
 * 1. Зробити сетап проекту (npm init)
 * 2. Створити файл index.js
 * 3. Переписати цю функцію створивши рекурсивну функцію
 */

const arr = [1, 2, 3, 4, 5];

// for (let i = 0; i < arr.length; i++) {
//     console.log(arr[i]);
// }

function recursiveIteration(array, index = 0) {
    if(index >= array.length) return;

    console.log(array[index]);

    recursiveIteration(array, index + 1);
}
recursiveIteration(arr, 0);
