const n = process.argv[2];

const divisionItems = [3 ,5 ,7];
const result = [];
for(let i =1; i<=n; i++) {
    if (divisionItems.some(div => i%div === 0)) {
        result.push(i);
    }
}
console.log('result: ', result)
