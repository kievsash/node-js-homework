/**
 * Bonux JS
 * HW 01
 * Дано додатнє ціле число n. Знайдіть всі числа в діапазоні [1, n] включно, які діляться на 3, 5 або 7. Поверніть масив цих чисел.
 */

const n = process.argv[2];

const divisionItems = [3 ,5 ,7];
const result = [];
for(let i =1; i<=n; i++) {
    if (divisionItems.some(div => i%div === 0)) {
        result.push(i);
    }
}
console.log('result: ', result)
