/**
 * Bonux JS
 * HW 03
 * Напишіть функцію delay(ms), яка повертає проміс, що виконується через ms мілісекунд.
 */

function delay(ms) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, ms)
    });
}

// Виклик функції
delay(2000).then(() => console.log('Пройшло 2 секунди'));
