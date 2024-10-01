/**
 * Bonux JS
 * HW 04
 * Ланцюг математичних операцій з Promises.
 * Дано число 5.
 * Кожна операція повинна бути в окремому промісі, і ці проміси слід з'єднати ланцюгом. Спочатку подвоїти його, потім додати 10.
 */

const value = 5;

// проміси тут
const double = (value) => new Promise((resolve) => resolve(value * 2));
const addTen = (value) => new Promise((resolve) => resolve(value  + 10));

double(value)
    .then(addTen)
    .then((result) => {
        console.log(result); // 20
    });
