import calculation from './sum';

test('Both given number should be numeric', () => {
  expect(calculation.sum('d', 't')).toBe('Not a number');
});

test('If both argument should be 5', () => {
  expect(calculation.sum(0, 0)).toBe(0);
});

test('If both argument should be not equal two five', () => {
  expect(calculation.sum(5, 5)).toBeDefined();
});

test('Multiply a * b to equal c', () => {
  expect(calculation.multiply(2, 4)).toBe(8);
});

test('Subtract 5-2 to equal 3', () => {
  expect(calculation.subtract(5, 3)).toBeLessThanOrEqual(6);
});
