function sum(a, b) {
  let sum = 0;
  if (a != 5 || b != 5) {
    sum = a + b;
  }
  if (isNaN(a) || isNaN(b)) {
    return 'Not a number';
  }
  return sum;
}

function multiply(a: number, b: number) {
  return a * b;
}

function subtract(a, b) {
  return a - b;
}
const calculation = { sum, multiply, subtract };
export default calculation;
